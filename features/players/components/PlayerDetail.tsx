"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { PlayerDetailQuery } from "@/features/players/graphql/PlayerDetailQuery";
import { DeletePlayerMutation } from "@/features/players/graphql/DeletePlayerMutation";
import type { PlayerDetailQuery as PlayerDetailQueryType } from "@/__generated__/PlayerDetailQuery.graphql";
import type { DeletePlayerMutation as DeletePlayerMutationType } from "@/__generated__/DeletePlayerMutation.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@/components/ui";

export function PlayerDetail({ id }: { id: string }) {
  const router = useRouter();
  const data = useLazyLoadQuery<PlayerDetailQueryType>(PlayerDetailQuery, { id });
  const [commitDelete] = useMutation<DeletePlayerMutationType>(DeletePlayerMutation);

  const player = data.players_by_pk;
  if (!player) {
    return <p className="p-6 text-muted-foreground">選手が見つかりません</p>;
  }

  const handleDelete = () => {
    if (!confirm(`「${player.name}」を削除しますか？`)) return;
    commitDelete({
      variables: { id },
      onCompleted: () => router.push("/players"),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{player.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/players/${id}/edit`}>編集</Link>
          </Button>
          <Button variant="outline" onClick={handleDelete}>
            削除
          </Button>
          <Button variant="outline" asChild>
            <Link href="/players">一覧に戻る</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">ポジション</dt>
              <dd>{player.position ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">国籍</dt>
              <dd>{player.nationality ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">生年月日</dt>
              <dd>{player.birth_date?.slice(0, 10) ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">所属クラブ</dt>
              <dd>
                {player.current_club ? (
                  <Link
                    href={`/clubs/${player.current_club.id}`}
                    className="text-primary hover:underline"
                  >
                    {player.current_club.name}
                  </Link>
                ) : (
                  "-"
                )}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>契約履歴</CardTitle>
        </CardHeader>
        <CardContent>
          {player.contracts.length === 0 ? (
            <p className="text-sm text-muted-foreground">契約情報なし</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 font-medium">クラブ</th>
                  <th className="pb-2 font-medium">開始日</th>
                  <th className="pb-2 font-medium">終了日</th>
                  <th className="pb-2 font-medium">年俸</th>
                  <th className="pb-2 font-medium">違約金</th>
                </tr>
              </thead>
              <tbody>
                {player.contracts.map((c) => (
                  <tr key={c.id} className="border-b last:border-0">
                    <td className="py-2">
                      <Link
                        href={`/clubs/${c.club.id}`}
                        className="text-primary hover:underline"
                      >
                        {c.club.name}
                      </Link>
                    </td>
                    <td className="py-2">{c.start_date?.slice(0, 10) ?? "-"}</td>
                    <td className="py-2">{c.end_date?.slice(0, 10) ?? "-"}</td>
                    <td className="py-2">
                      {c.salary != null ? c.salary.toLocaleString() : "-"}
                    </td>
                    <td className="py-2">
                      {c.clause != null ? c.clause.toLocaleString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>移籍履歴</CardTitle>
        </CardHeader>
        <CardContent>
          {player.transfers.length === 0 ? (
            <p className="text-sm text-muted-foreground">移籍履歴なし</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 font-medium">時期</th>
                  <th className="pb-2 font-medium">移籍元</th>
                  <th className="pb-2 font-medium">移籍先</th>
                  <th className="pb-2 font-medium">種別</th>
                  <th className="pb-2 font-medium">移籍金</th>
                </tr>
              </thead>
              <tbody>
                {player.transfers.map((t) => (
                  <tr key={t.id} className="border-b last:border-0">
                    <td className="py-2">
                      {t.transfer_year}/{t.transfer_month}
                    </td>
                    <td className="py-2">
                      {t.from_club ? (
                        <Link
                          href={`/clubs/${t.from_club.id}`}
                          className="text-primary hover:underline"
                        >
                          {t.from_club.name}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2">
                      <Link
                        href={`/clubs/${t.to_club.id}`}
                        className="text-primary hover:underline"
                      >
                        {t.to_club.name}
                      </Link>
                    </td>
                    <td className="py-2">{t.type}</td>
                    <td className="py-2">
                      {t.fee != null ? t.fee.toLocaleString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>シーズン成績</CardTitle>
        </CardHeader>
        <CardContent>
          {player.stats.length === 0 ? (
            <p className="text-sm text-muted-foreground">成績データなし</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 font-medium">シーズン</th>
                  <th className="pb-2 font-medium">クラブ</th>
                  <th className="pb-2 font-medium">試合</th>
                  <th className="pb-2 font-medium">得点</th>
                  <th className="pb-2 font-medium">アシスト</th>
                </tr>
              </thead>
              <tbody>
                {player.stats.map((s) => (
                  <tr key={s.id} className="border-b last:border-0">
                    <td className="py-2">{s.season}</td>
                    <td className="py-2">
                      <Link
                        href={`/clubs/${s.club.id}`}
                        className="text-primary hover:underline"
                      >
                        {s.club.name}
                      </Link>
                    </td>
                    <td className="py-2">{s.matches}</td>
                    <td className="py-2">{s.goals}</td>
                    <td className="py-2">{s.assists}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
