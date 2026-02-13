"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useLazyLoadQuery } from "react-relay";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateTransferMutation } from "@/features/transfers/graphql/CreateTransferMutation";
import { UpdateTransferMutation } from "@/features/transfers/graphql/UpdateTransferMutation";
import { TransferDetailQuery } from "@/features/transfers/graphql/TransferDetailQuery";
import { ClubsForSelectQuery } from "@/features/players/graphql/ClubsForSelectQuery";
import { PlayersListQuery } from "@/features/players/graphql/PlayersListQuery";
import type { CreateTransferMutation as CreateTransferMutationType } from "@/__generated__/CreateTransferMutation.graphql";
import type { UpdateTransferMutation as UpdateTransferMutationType } from "@/__generated__/UpdateTransferMutation.graphql";
import type { TransferDetailQuery as TransferDetailQueryType } from "@/__generated__/TransferDetailQuery.graphql";
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

const TRANSFER_TYPES = [
  { value: "PERMANENT", label: "完全移籍" },
  { value: "LOAN", label: "ローン" },
  { value: "FREE", label: "フリー" },
  { value: "RETURN_FROM_LOAN", label: "ローン復帰" },
  { value: "END_OF_CONTRACT", label: "契約満了" },
] as const;

const formSchema = z.object({
  playerId: z.string().min(1, "選手を選択してください"),
  fromClubId: z.string().optional(),
  toClubId: z.string().min(1, "移籍先を選択してください"),
  transferYear: z.string().min(1, "年を入力してください"),
  transferMonth: z.string().min(1, "月を入力してください"),
  type: z.string().min(1, "種別を選択してください"),
  fee: z.string().optional(),
  loanEndYear: z.string().optional(),
  loanEndMonth: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function TransferForm({ transferId }: { transferId?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const existingData = transferId
    ? useLazyLoadQuery<TransferDetailQueryType>(TransferDetailQuery, { id: transferId })
    : null;

  const transfer = existingData?.transfers_by_pk;
  const isEdit = !!transferId;

  if (isEdit && existingData && !transfer) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">移籍記録が見つかりません</p>
        <Button variant="outline" asChild>
          <Link href="/transfers">移籍一覧に戻る</Link>
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

  const [commitCreate] = useMutation<CreateTransferMutationType>(CreateTransferMutation);
  const [commitUpdate] = useMutation<UpdateTransferMutationType>(UpdateTransferMutation);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerId: transfer?.player?.id ?? "",
      fromClubId: transfer?.from_club?.id ?? "",
      toClubId: transfer?.to_club?.id ?? "",
      transferYear: transfer?.transfer_year?.toString() ?? "",
      transferMonth: transfer?.transfer_month?.toString() ?? "",
      type: transfer?.type ?? "PERMANENT",
      fee: transfer?.fee?.toString() ?? "",
      loanEndYear: transfer?.loan_end_year?.toString() ?? "",
      loanEndMonth: transfer?.loan_end_month?.toString() ?? "",
    },
  });

  useEffect(() => {
    if (transfer && isEdit) {
      form.reset({
        playerId: transfer.player.id,
        fromClubId: transfer.from_club?.id ?? "",
        toClubId: transfer.to_club.id,
        transferYear: transfer.transfer_year.toString(),
        transferMonth: transfer.transfer_month.toString(),
        type: transfer.type,
        fee: transfer.fee?.toString() ?? "",
        loanEndYear: transfer.loan_end_year?.toString() ?? "",
        loanEndMonth: transfer.loan_end_month?.toString() ?? "",
      });
    }
  }, [transfer?.id, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (values: FormValues) => {
    setError(null);
    const payload = {
      player_id: values.playerId,
      from_club_id: values.fromClubId || null,
      to_club_id: values.toClubId,
      transfer_year: Number(values.transferYear),
      transfer_month: Number(values.transferMonth),
      type: values.type,
      fee: values.fee ? Number(values.fee) : null,
      loan_end_year: values.loanEndYear ? Number(values.loanEndYear) : null,
      loan_end_month: values.loanEndMonth ? Number(values.loanEndMonth) : null,
    };
    if (isEdit && transferId) {
      commitUpdate({
        variables: { id: transferId, set: payload },
        onCompleted: () => router.push(`/transfers/${transferId}`),
        onError: (e) => setError(e.message),
      });
    } else {
      commitCreate({
        variables: { object: payload },
        onCompleted: () => router.push("/transfers"),
        onError: (e) => setError(e.message),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">
          {isEdit ? "移籍編集" : "移籍登録"}
        </h1>
        <Button variant="outline" asChild>
          <Link href={isEdit ? `/transfers/${transferId}` : "/transfers"}>
            戻る
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>移籍情報</CardTitle>
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

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fromClubId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>移籍元</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="移籍元を選択" />
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
                <FormField
                  control={form.control}
                  name="toClubId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>移籍先 *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="移籍先を選択" />
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
                  name="transferYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>年 *</FormLabel>
                      <FormControl>
                        <Input placeholder="2024" inputMode="numeric" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transferMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>月 *</FormLabel>
                      <FormControl>
                        <Input placeholder="1" inputMode="numeric" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>種別 *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TRANSFER_TYPES.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
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

              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>移籍金</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="75000000"
                        inputMode="numeric"
                        {...field}
                        className="max-w-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("type") === "LOAN" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="loanEndYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ローン終了年</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="2025"
                            inputMode="numeric"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loanEndMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ローン終了月</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="6"
                            inputMode="numeric"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

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
