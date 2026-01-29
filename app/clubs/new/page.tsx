"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
    Button, 
    Input, 
    Textarea,
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
      { message: "創設年は1800〜2100の整数" }
    ),
  stadium: z.string().max(120).optional(),
  note: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewClubPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      league: "",
      foundedYear: undefined,
      stadium: "",
      note: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);

    const foundedYear =
      values.foundedYear === undefined || values.foundedYear === ""
        ? undefined
        : Number(values.foundedYear);

    try {
      const res = await axios.post(
        "/api/clubs",
        {
          name: values.name,
          country: values.country,
          league: values.league,
          foundedYear,
          stadium: values.stadium,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.status || res.data.errors) {
        setServerError(res.data.errors?.[0]?.message ?? "登録に失敗した");
        return;
      }
    } catch (err: any) {
      setServerError(
        err.response?.data?.message ?? "登録に失敗した"
      );
      return;
    }

    // ここは一旦トップに戻すでOK。後でクラブ詳細へ遷移に変える。
    router.push("/");
  };

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">クラブ登録</h1>
        <Button variant="outline" asChild>
          <Link href="/">戻る</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>クラブ情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {serverError && (
            <div className="rounded-md border p-3 text-sm">
              <div className="font-medium">エラー</div>
              <div className="text-muted-foreground">{serverError}</div>
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
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a league" />
                          </SelectTrigger>
                          <SelectContent>
                            {LEAGUES.map((league) => (
                              <SelectItem key={league.id} value={league.id.toString()}>
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

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メモ</FormLabel>
                    <FormControl>
                      <Textarea placeholder="補足情報" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button type="submit" disabled={form.formState.isSubmitting} className="cursor-pointer">
                  {form.formState.isSubmitting ? "登録中..." : "登録"}
                </Button>
                <Button type="button" variant="outline" onClick={() => form.reset()} className="cursor-pointer">
                  リセット
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
