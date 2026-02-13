"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useLazyLoadQuery } from "react-relay";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateClubMutation } from "@/features/clubs/graphql/CreateClubMutation";
import { UpdateClubMutation } from "@/features/clubs/graphql/UpdateClubMutation";
import { ClubDetailQuery } from "@/features/clubs/graphql/ClubDetailQuery";
import type { CreateClubMutation as CreateClubMutationType } from "@/__generated__/CreateClubMutation.graphql";
import type { UpdateClubMutation as UpdateClubMutationType } from "@/__generated__/UpdateClubMutation.graphql";
import type { ClubDetailQuery as ClubDetailQueryType } from "@/__generated__/ClubDetailQuery.graphql";
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
import { LEAGUES } from "@/constants";

const formSchema = z.object({
  name: z.string().min(1).max(80),
  country: z.string().max(80).optional(),
  league: z.string().max(80).optional(),
  foundedYear: z
    .union([z.string(), z.number()])
    .optional()
    .refine(
      (v) => {
        if (v === undefined || v === "") return true;
        const n = typeof v === "string" ? parseInt(v, 10) : v;
        return !Number.isNaN(n) && Number.isInteger(n) && n >= 1800 && n <= 2100;
      },
      { message: "創設年は1800〜2100の整数" },
    ),
  stadium: z.string().max(120).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ClubForm({ clubId }: { clubId?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const existingData = clubId
    ? useLazyLoadQuery<ClubDetailQueryType>(ClubDetailQuery, { id: clubId })
    : null;

  const club = existingData?.clubs_by_pk;
  const isEdit = !!clubId;

  const [commitCreate] = useMutation<CreateClubMutationType>(CreateClubMutation);
  const [commitUpdate] = useMutation<UpdateClubMutationType>(UpdateClubMutation);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: club?.name ?? "",
      country: club?.country ?? "",
      league: club?.league ?? "",
      foundedYear: club?.founded_year?.toString() ?? "",
      stadium: club?.stadium ?? "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setError(null);

    const foundedYear =
      values.foundedYear === undefined || values.foundedYear === ""
        ? null
        : Number(values.foundedYear);

    if (isEdit && clubId) {
      commitUpdate({
        variables: {
          id: clubId,
          set: {
            name: values.name,
            country: values.country || null,
            league: values.league || null,
            founded_year: foundedYear,
            stadium: values.stadium || null,
          },
        },
        onCompleted: () => router.push(`/clubs/${clubId}`),
        onError: (e) => setError(e.message),
      });
    } else {
      commitCreate({
        variables: {
          object: {
            name: values.name,
            country: values.country || null,
            league: values.league || null,
            founded_year: foundedYear,
            stadium: values.stadium || null,
          },
        },
        onCompleted: () => router.push("/clubs"),
        onError: (e) => setError(e.message),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">
          {isEdit ? "クラブ編集" : "クラブ登録"}
        </h1>
        <Button variant="outline" asChild>
          <Link href={isEdit ? `/clubs/${clubId}` : "/clubs"}>戻る</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>クラブ情報</CardTitle>
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
                    <FormLabel>クラブ名 *</FormLabel>
                    <FormControl>
                      <Input placeholder="Liverpool" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>国</FormLabel>
                      <FormControl>
                        <Input placeholder="England" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="league"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>リーグ</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="リーグを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {LEAGUES.map((league) => (
                              <SelectItem
                                key={league.id}
                                value={league.id.toString()}
                              >
                                {league.name}
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
                  name="foundedYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>創設年</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1892"
                          inputMode="numeric"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stadium"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>スタジアム</FormLabel>
                      <FormControl>
                        <Input placeholder="Anfield" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="cursor-pointer"
                >
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
                  className="cursor-pointer"
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
