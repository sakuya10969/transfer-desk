"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useLazyLoadQuery } from "react-relay";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateStatMutation } from "@/features/stats/graphql/CreateStatMutation";
import { UpdateStatMutation } from "@/features/stats/graphql/UpdateStatMutation";
import { StatDetailQuery } from "@/features/stats/graphql/StatDetailQuery";
import { ClubsForSelectQuery } from "@/features/players/graphql/ClubsForSelectQuery";
import { PlayersListQuery } from "@/features/players/graphql/PlayersListQuery";
import type { CreateStatMutation as CreateStatMutationType } from "@/__generated__/CreateStatMutation.graphql";
import type { UpdateStatMutation as UpdateStatMutationType } from "@/__generated__/UpdateStatMutation.graphql";
import type { StatDetailQuery as StatDetailQueryType } from "@/__generated__/StatDetailQuery.graphql";
import type { ClubsForSelectQuery as ClubsForSelectQueryType } from "@/__generated__/ClubsForSelectQuery.graphql";
import type { PlayersListQuery as PlayersListQueryType } from "@/__generated__/PlayersListQuery.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";

const formSchema = z.object({
  season: z.string().min(1, "シーズンを入力してください"),
  playerId: z.string().min(1, "選手を選択してください"),
  clubId: z.string().min(1, "クラブを選択してください"),
  matches: z.string().optional(),
  goals: z.string().optional(),
  assists: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function StatForm({ statId }: { statId?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const existingData = statId
    ? useLazyLoadQuery<StatDetailQueryType>(StatDetailQuery, { id: statId })
    : null;

  const stat = existingData?.stats_by_pk;
  const isEdit = !!statId;

  if (isEdit && existingData && !stat) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">成績データが見つかりません</p>
        <Button variant="outline" asChild>
          <Link href="/stats">成績一覧に戻る</Link>
        </Button>
      </div>
    );
  }

  const clubsData = useLazyLoadQuery<ClubsForSelectQueryType>(ClubsForSelectQuery, {});
  const playersData = useLazyLoadQuery<PlayersListQueryType>(PlayersListQuery, {
    limit: 1000,
    offset: 0,
    where: {},
    order_by: [{ name: "asc" as any }],
  });

  const [commitCreate] = useMutation<CreateStatMutationType>(CreateStatMutation);
  const [commitUpdate] = useMutation<UpdateStatMutationType>(UpdateStatMutation);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      season: stat?.season ?? "",
      playerId: stat?.player?.id ?? "",
      clubId: stat?.club?.id ?? "",
      matches: stat?.matches?.toString() ?? "0",
      goals: stat?.goals?.toString() ?? "0",
      assists: stat?.assists?.toString() ?? "0",
    },
  });

  useEffect(() => {
    if (stat && isEdit) {
      form.reset({
        season: stat.season,
        playerId: stat.player.id,
        clubId: stat.club.id,
        matches: stat.matches.toString(),
        goals: stat.goals.toString(),
        assists: stat.assists.toString(),
      });
    }
  }, [stat?.id, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (values: FormValues) => {
    setError(null);
    const payload = {
      season: values.season,
      player_id: values.playerId,
      club_id: values.clubId,
      matches: values.matches ? Number(values.matches) : 0,
      goals: values.goals ? Number(values.goals) : 0,
      assists: values.assists ? Number(values.assists) : 0,
    };
    if (isEdit && statId) {
      commitUpdate({
        variables: { id: statId, set: payload },
        onCompleted: () => router.push("/stats"),
        onError: (e) => setError(e.message),
      });
    } else {
      commitCreate({
        variables: { object: payload },
        onCompleted: () => router.push("/stats"),
        onError: (e) => setError(e.message),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">
          {isEdit ? "成績編集" : "成績登録"}
        </h1>
        <Button variant="outline" asChild>
          <Link href="/stats">戻る</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>成績情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="rounded-md border p-3 text-sm">
              <div className="font-medium">エラー</div>
              <div className="text-muted-foreground">{error}</div>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="season"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>シーズン *</FormLabel>
                    <FormControl>
                      <Input placeholder="2024-25" {...field} className="max-w-48" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="playerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>選手 *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="選手を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {playersData.players.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clubId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>クラブ *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="クラブを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {clubsData.clubs.map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="matches"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>試合数</FormLabel>
                      <FormControl>
                        <Input inputMode="numeric" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>得点</FormLabel>
                      <FormControl>
                        <Input inputMode="numeric" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assists"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>アシスト</FormLabel>
                      <FormControl>
                        <Input inputMode="numeric" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting
                    ? "処理中..."
                    : isEdit
                      ? "更新"
                      : "登録"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  リセット
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
