"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLazyLoadQuery, useMutation } from "react-relay";

import { ClubDetailQuery } from "@/features/clubs/graphql/ClubDetailQuery";
import { DeleteClubMutation } from "@/features/clubs/graphql/DeleteClubMutation";
import type { ClubDetailQuery as ClubDetailQueryType } from "@/__generated__/ClubDetailQuery.graphql";
import type { DeleteClubMutation as DeleteClubMutationType } from "@/__generated__/DeleteClubMutation.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Separator,
} from "@/components/ui";

export function ClubDetail({ id }: { id: string }) {
  const router = useRouter();
  const data = useLazyLoadQuery<ClubDetailQueryType>(ClubDetailQuery, { id });
  const [commitDelete] = useMutation<DeleteClubMutationType>(DeleteClubMutation);

  const club = data.clubs_by_pk;
  if (!club) {
    return <p className="p-6 text-muted-foreground">クラブが見つかりません</p>;
  }

  const handleDelete = () => {
    if (!confirm(`「${club.name}」を削除しますか？`)) return;
    commitDelete({
      variables: { id },
      onCompleted: () => router.push("/clubs"),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{club.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/clubs/${id}/edit`}>編集</Link>
          </Button>
          <Button variant="outline" onClick={handleDelete}>
            削除
          </Button>
          <Button variant="outline" asChild>
            <Link href="/clubs">一覧に戻る</Link>
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
              <dt className="text-sm text-muted-foreground">国</dt>
              <dd>{club.country ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">リーグ</dt>
              <dd>{club.league ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">創設年</dt>
              <dd>{club.founded_year ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">スタジアム</dt>
              <dd>{club.stadium ?? "-"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>所属選手</CardTitle>
        </CardHeader>
        <CardContent>
          {club.players.length === 0 ? (
            <p className="text-sm text-muted-foreground">所属選手なし</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 font-medium">選手名</th>
                  <th className="pb-2 font-medium">ポジション</th>
                  <th className="pb-2 font-medium">国籍</th>
                </tr>
              </thead>
              <tbody>
                {club.players.map((p) => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="py-2">
                      <Link
                        href={`/players/${p.id}`}
                        className="text-primary hover:underline"
                      >
                        {p.name}
                      </Link>
                    </td>
                    <td className="py-2">{p.position ?? "-"}</td>
                    <td className="py-2">{p.nationality ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>契約一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {club.contracts.length === 0 ? (
            <p className="text-sm text-muted-foreground">契約情報なし</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 font-medium">選手名</th>
                  <th className="pb-2 font-medium">開始日</th>
                  <th className="pb-2 font-medium">終了日</th>
                  <th className="pb-2 font-medium">年俸</th>
                </tr>
              </thead>
              <tbody>
                {club.contracts.map((c) => (
                  <tr key={c.id} className="border-b last:border-0">
                    <td className="py-2">
                      <Link
                        href={`/players/${c.player.id}`}
                        className="text-primary hover:underline"
                      >
                        {c.player.name}
                      </Link>
                    </td>
                    <td className="py-2">{c.start_date?.slice(0, 10) ?? "-"}</td>
                    <td className="py-2">{c.end_date?.slice(0, 10) ?? "-"}</td>
                    <td className="py-2">
                      {c.salary != null ? `${c.salary.toLocaleString()}` : "-"}
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
          {club.transfersByToClubId.length === 0 && club.transfers.length === 0 ? (
            <p className="text-sm text-muted-foreground">移籍履歴なし</p>
          ) : (
            <div className="space-y-4">
              {club.transfersByToClubId.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-medium">加入</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2 font-medium">選手</th>
                        <th className="pb-2 font-medium">移籍元</th>
                        <th className="pb-2 font-medium">時期</th>
                        <th className="pb-2 font-medium">種別</th>
                        <th className="pb-2 font-medium">移籍金</th>
                      </tr>
                    </thead>
                    <tbody>
                      {club.transfersByToClubId.map((t) => (
                        <tr key={t.id} className="border-b last:border-0">
                          <td className="py-2">
                            <Link
                              href={`/players/${t.player.id}`}
                              className="text-primary hover:underline"
                            >
                              {t.player.name}
                            </Link>
                          </td>
                          <td className="py-2">
                            {t.club ? (
                              <Link
                                href={`/clubs/${t.club.id}`}
                                className="text-primary hover:underline"
                              >
                                {t.club.name}
                              </Link>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="py-2">
                            {t.transfer_year}/{t.transfer_month}
                          </td>
                          <td className="py-2">{t.type}</td>
                          <td className="py-2">
                            {t.fee != null ? `${t.fee.toLocaleString()}` : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {club.transfers.length > 0 && (
                <div>
                  <Separator className="my-4" />
                  <h4 className="mb-2 text-sm font-medium">退団</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2 font-medium">選手</th>
                        <th className="pb-2 font-medium">移籍先</th>
                        <th className="pb-2 font-medium">時期</th>
                        <th className="pb-2 font-medium">種別</th>
                        <th className="pb-2 font-medium">移籍金</th>
                      </tr>
                    </thead>
                    <tbody>
                      {club.transfers.map((t) => (
                        <tr key={t.id} className="border-b last:border-0">
                          <td className="py-2">
                            <Link
                              href={`/players/${t.player.id}`}
                              className="text-primary hover:underline"
                            >
                              {t.player.name}
                            </Link>
                          </td>
                          <td className="py-2">
                            <Link
                              href={`/clubs/${t.clubByToClubId.id}`}
                              className="text-primary hover:underline"
                            >
                              {t.clubByToClubId.name}
                            </Link>
                          </td>
                          <td className="py-2">
                            {t.transfer_year}/{t.transfer_month}
                          </td>
                          <td className="py-2">{t.type}</td>
                          <td className="py-2">
                            {t.fee != null ? `${t.fee.toLocaleString()}` : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>成績</CardTitle>
        </CardHeader>
        <CardContent>
          {club.stats.length === 0 ? (
            <p className="text-sm text-muted-foreground">成績データなし</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 font-medium">シーズン</th>
                  <th className="pb-2 font-medium">選手</th>
                  <th className="pb-2 font-medium">試合</th>
                  <th className="pb-2 font-medium">得点</th>
                  <th className="pb-2 font-medium">アシスト</th>
                </tr>
              </thead>
              <tbody>
                {club.stats.map((s) => (
                  <tr key={s.id} className="border-b last:border-0">
                    <td className="py-2">{s.season}</td>
                    <td className="py-2">
                      <Link
                        href={`/players/${s.player.id}`}
                        className="text-primary hover:underline"
                      >
                        {s.player.name}
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
