"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useLazyLoadQuery } from "react-relay";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateContractMutation } from "@/features/contracts/graphql/CreateContractMutation";
import { UpdateContractMutation } from "@/features/contracts/graphql/UpdateContractMutation";
import { ContractDetailQuery } from "@/features/contracts/graphql/ContractDetailQuery";
import { ClubsForSelectQuery } from "@/features/players/graphql/ClubsForSelectQuery";
import { PlayersListQuery } from "@/features/players/graphql/PlayersListQuery";
import type { CreateContractMutation as CreateContractMutationType } from "@/__generated__/CreateContractMutation.graphql";
import type { UpdateContractMutation as UpdateContractMutationType } from "@/__generated__/UpdateContractMutation.graphql";
import type { ContractDetailQuery as ContractDetailQueryType } from "@/__generated__/ContractDetailQuery.graphql";
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
  playerId: z.string().min(1, "選手を選択してください"),
  clubId: z.string().min(1, "クラブを選択してください"),
  startDate: z.string().min(1, "開始日を入力してください"),
  endDate: z.string().optional(),
  salary: z.string().optional(),
  clause: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContractForm({ contractId }: { contractId?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const existingData = contractId
    ? useLazyLoadQuery<ContractDetailQueryType>(ContractDetailQuery, { id: contractId })
    : null;

  const contract = existingData?.contracts_by_pk;
  const isEdit = !!contractId;

  if (isEdit && existingData && !contract) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">契約が見つかりません</p>
        <Button variant="outline" asChild>
          <Link href="/contracts">契約一覧に戻る</Link>
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

  const [commitCreate] = useMutation<CreateContractMutationType>(CreateContractMutation);
  const [commitUpdate] = useMutation<UpdateContractMutationType>(UpdateContractMutation);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerId: contract?.player?.id ?? "",
      clubId: contract?.club?.id ?? "",
      startDate: contract?.start_date?.slice(0, 10) ?? "",
      endDate: contract?.end_date?.slice(0, 10) ?? "",
      salary: contract?.salary?.toString() ?? "",
      clause: contract?.clause?.toString() ?? "",
    },
  });

  useEffect(() => {
    if (contract && isEdit) {
      form.reset({
        playerId: contract.player.id,
        clubId: contract.club.id,
        startDate: contract.start_date?.slice(0, 10) ?? "",
        endDate: contract.end_date?.slice(0, 10) ?? "",
        salary: contract.salary?.toString() ?? "",
        clause: contract.clause?.toString() ?? "",
      });
    }
  }, [contract?.id, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (values: FormValues) => {
    setError(null);
    if (isEdit && contractId) {
      commitUpdate({
        variables: {
          id: contractId,
          set: {
            player_id: values.playerId,
            club_id: values.clubId,
            start_date: values.startDate,
            end_date: values.endDate || null,
            salary: values.salary ? Number(values.salary) : null,
            clause: values.clause ? Number(values.clause) : null,
          },
        },
        onCompleted: () => router.push(`/contracts/${contractId}`),
        onError: (e) => setError(e.message),
      });
    } else {
      commitCreate({
        variables: {
          object: {
            player_id: values.playerId,
            club_id: values.clubId,
            start_date: values.startDate,
            end_date: values.endDate || null,
            salary: values.salary ? Number(values.salary) : null,
            clause: values.clause ? Number(values.clause) : null,
          },
        },
        onCompleted: () => router.push("/contracts"),
        onError: (e) => setError(e.message),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">
          {isEdit ? "契約編集" : "契約登録"}
        </h1>
        <Button variant="outline" asChild>
          <Link href={isEdit ? `/contracts/${contractId}` : "/contracts"}>
            戻る
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>契約情報</CardTitle>
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

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>開始日 *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>終了日</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>年俸</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="200000"
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
                  name="clause"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>違約金</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="150000000"
                          inputMode="numeric"
                          {...field}
                        />
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
