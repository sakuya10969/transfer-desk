"use client";

import Link from "next/link";
import { useLazyLoadQuery } from "react-relay";

import { DashboardQuery } from "@/features/dashboard/graphql/DashboardQuery";
import type { DashboardQuery as DashboardQueryType } from "@/__generated__/DashboardQuery.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@/components/ui";

export function Dashboard() {
  const data = useLazyLoadQuery<DashboardQueryType>(DashboardQuery, {}, {
    fetchPolicy: "network-only",
  });

  const clubCount = data.clubs_aggregate.aggregate?.count ?? 0;
  const playerCount = data.players_aggregate.aggregate?.count ?? 0;
  const contractCount = data.contracts_aggregate.aggregate?.count ?? 0;
  const transferCount = data.transfers_aggregate.aggregate?.count ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              登録クラブ数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{clubCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              登録選手数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{playerCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              有効契約数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{contractCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              移籍件数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{transferCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/clubs/new">クラブを登録</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/players/new">選手を登録</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contracts/new">契約を登録</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/transfers/new">移籍を登録</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>最近更新されたクラブ</CardTitle>
          </CardHeader>
          <CardContent>
            {data.recent_clubs.length === 0 ? (
              <p className="text-sm text-muted-foreground">データなし</p>
            ) : (
              <ul className="space-y-2">
                {data.recent_clubs.map((club) => (
                  <li key={club.id} className="flex items-center justify-between text-sm">
                    <Link
                      href={`/clubs/${club.id}`}
                      className="text-primary hover:underline"
                    >
                      {club.name}
                    </Link>
                    <span className="text-muted-foreground">
                      {club.league ?? club.country ?? "-"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最近追加された選手</CardTitle>
          </CardHeader>
          <CardContent>
            {data.recent_players.length === 0 ? (
              <p className="text-sm text-muted-foreground">データなし</p>
            ) : (
              <ul className="space-y-2">
                {data.recent_players.map((player) => (
                  <li
                    key={player.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <Link
                      href={`/players/${player.id}`}
                      className="text-primary hover:underline"
                    >
                      {player.name}
                    </Link>
                    <span className="text-muted-foreground">
                      {player.position ?? "-"}{" "}
                      {player.current_club ? `/ ${player.current_club.name}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>直近の移籍履歴</CardTitle>
        </CardHeader>
        <CardContent>
          {data.recent_transfers.length === 0 ? (
            <p className="text-sm text-muted-foreground">データなし</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 font-medium">時期</th>
                    <th className="pb-2 font-medium">選手</th>
                    <th className="pb-2 font-medium">移籍元</th>
                    <th className="pb-2 font-medium">移籍先</th>
                    <th className="pb-2 font-medium">種別</th>
                    <th className="pb-2 font-medium">移籍金</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent_transfers.map((t) => (
                    <tr key={t.id} className="border-b last:border-0">
                      <td className="py-2">
                        {t.transfer_year}/{t.transfer_month}
                      </td>
                      <td className="py-2">
                        <Link
                          href={`/players/${t.player.id}`}
                          className="text-primary hover:underline"
                        >
                          {t.player.name}
                        </Link>
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
