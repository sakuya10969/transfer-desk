import dynamic from "next/dynamic";

const TransferForm = dynamic(
  () => import("@/features/transfers/components/TransferForm").then((m) => m.TransferForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function NewTransferPage() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <TransferForm />
    </div>
  );
}
