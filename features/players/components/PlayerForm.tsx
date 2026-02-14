"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useLazyLoadQuery } from "react-relay";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreatePlayerMutation } from "@/features/players/graphql/CreatePlayerMutation";
import { UpdatePlayerMutation } from "@/features/players/graphql/UpdatePlayerMutation";
import { PlayerDetailQuery } from "@/features/players/graphql/PlayerDetailQuery";
import { ClubsForSelectQuery } from "@/features/players/graphql/ClubsForSelectQuery";
import type { CreatePlayerMutation as CreatePlayerMutationType } from "@/__generated__/CreatePlayerMutation.graphql";
import type { UpdatePlayerMutation as UpdatePlayerMutationType } from "@/__generated__/UpdatePlayerMutation.graphql";
import type { PlayerDetailQuery as PlayerDetailQueryType } from "@/__generated__/PlayerDetailQuery.graphql";
import type { ClubsForSelectQuery as ClubsForSelectQueryType } from "@/__generated__/ClubsForSelectQuery.graphql";
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
import { POSITIONS } from "@/constants";

const formSchema = z.object({
  name: z.string().min(1).max(120),
  position: z.string().optional(),
  nationality: z.string().max(80).optional(),
  birthDate: z.string().optional(),
  currentClubId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function PlayerForm({ playerId }: { playerId?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const existingData = playerId
    ? useLazyLoadQuery<PlayerDetailQueryType>(PlayerDetailQuery, { id: playerId })
    : null;

  const clubsData = useLazyLoadQuery<ClubsForSelectQueryType>(ClubsForSelectQuery, {});

  const player = existingData?.players_by_pk;
  const isEdit = !!playerId;

  const [commitCreate] = useMutation<CreatePlayerMutationType>(CreatePlayerMutation);
  const [commitUpdate] = useMutation<UpdatePlayerMutationType>(UpdatePlayerMutation);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: player?.name ?? "",
      position: player?.position ?? "",
      nationality: player?.nationality ?? "",
      birthDate: player?.birth_date?.slice(0, 10) ?? "",
      currentClubId: player?.club?.id ?? "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setError(null);

    if (isEdit && playerId) {
      commitUpdate({
        variables: {
          id: playerId,
          set: {
            name: values.name,
            position: values.position || null,
            nationality: values.nationality || null,
            birth_date: values.birthDate || null,
            current_club_id: values.currentClubId || null,
          },
        },
        onCompleted: () => router.push(`/players/${playerId}`),
        onError: (e) => setError(e.message),
      });
    } else {
      commitCreate({
        variables: {
          object: {
            name: values.name,
            position: values.position || null,
            nationality: values.nationality || null,
            birth_date: values.birthDate || null,
            current_club_id: values.currentClubId || null,
          },
        },
        onCompleted: () => router.push("/players"),
        onError: (e) => setError(e.message),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">
          {isEdit ? "選手編集" : "選手登録"}
        </h1>
        <Button variant="outline" asChild>
          <Link href={isEdit ? `/players/${playerId}` : "/players"}>戻る</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>選手情報</CardTitle>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>選手名 *</FormLabel>
                    <FormControl>
                      <Input placeholder="モハメドサラー" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ポジション</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="ポジションを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {POSITIONS.map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                                {p.label} ({p.category})
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
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>国籍</FormLabel>
                      <FormControl>
                        <Input placeholder="エジプト" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>生年月日</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentClubId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>所属クラブ</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
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
