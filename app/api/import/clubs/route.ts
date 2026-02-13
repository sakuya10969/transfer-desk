import { NextResponse } from "next/server";
import { hasuraFetch } from "@/app/api/_lib/hasuraClient";

type InsertResult = {
  insert_clubs: {
    returning: Array<{
      id: string;
      name: string;
    }>;
  };
};

const INSERT_CLUBS_MUTATION = `
  mutation ImportClubs($objects: [clubs_insert_input!]!) {
    insert_clubs(objects: $objects) {
      returning {
        id
        name
      }
    }
  }
`;

function parseCsv(text: string): string[][] {
  const lines = text.trim().split(/\r?\n/);
  return lines.map((line) => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if ((char === "," && !inQuotes) || char === "\t") {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "CSVファイルをアップロードしてください" },
        { status: 400 }
      );
    }

    const text = await file.text();
    const rows = parseCsv(text);

    if (rows.length < 2) {
      return NextResponse.json(
        { message: "CSVにデータが含まれていません（ヘッダー行+1行以上必要）" },
        { status: 400 }
      );
    }

    const header = rows[0].map((h) => h.toLowerCase().replace(/\s/g, "_"));
    const nameIdx = header.findIndex(
      (h) => h === "name" || h === "クラブ名" || h === "club"
    );
    const countryIdx = header.findIndex(
      (h) => h === "country" || h === "国" || h === "country"
    );
    const leagueIdx = header.findIndex(
      (h) => h === "league" || h === "リーグ" || h === "league"
    );
    const foundedIdx = header.findIndex(
      (h) =>
        h === "founded_year" ||
        h === "foundedyear" ||
        h === "創設年" ||
        h === "year"
    );
    const stadiumIdx = header.findIndex(
      (h) => h === "stadium" || h === "スタジアム" || h === "stadium"
    );

    if (nameIdx === -1) {
      return NextResponse.json(
        {
          message:
            "CSVに name / クラブ名 列が必要です。ヘッダー例: name,country,league,founded_year,stadium",
        },
        { status: 400 }
      );
    }

    const objects = rows.slice(1).map((row) => {
      const name = row[nameIdx]?.trim();
      if (!name) return null;
      const country =
        countryIdx >= 0 && row[countryIdx] ? row[countryIdx].trim() : null;
      const league =
        leagueIdx >= 0 && row[leagueIdx] ? row[leagueIdx].trim() : null;
      let founded_year: number | null = null;
      if (foundedIdx >= 0 && row[foundedIdx]) {
        const n = parseInt(row[foundedIdx], 10);
        founded_year = Number.isNaN(n) ? null : n;
      }
      const stadium =
        stadiumIdx >= 0 && row[stadiumIdx] ? row[stadiumIdx].trim() : null;

      return {
        name,
        country: country || null,
        league: league || null,
        founded_year,
        stadium: stadium || null,
      };
    });

    const valid = objects.filter((o): o is NonNullable<typeof o> => o !== null);

    if (valid.length === 0) {
      return NextResponse.json(
        { message: "有効なクラブデータがありません" },
        { status: 400 }
      );
    }

    const data = await hasuraFetch<InsertResult>(INSERT_CLUBS_MUTATION, {
      objects: valid,
    });

    const inserted = data.insert_clubs.returning.length;

    return NextResponse.json({
      message: `${inserted} 件のクラブを登録しました`,
      count: inserted,
      ids: data.insert_clubs.returning.map((r) => r.id),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "CSVインポートに失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
