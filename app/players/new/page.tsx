import dynamic from "next/dynamic";

const PlayerForm = dynamic(
  () => import("@/features/players/components/PlayerForm").then((m) => m.PlayerForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function NewPlayerPage() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <PlayerForm />
    </div>
  );
}
