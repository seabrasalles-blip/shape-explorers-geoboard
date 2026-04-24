type Props = {
  state: "idle" | "success" | "error";
  message: string;
};

export const FeedbackBox = ({ state, message }: Props) => {
  if (state === "idle") {
    return (
      <div className="rounded-2xl bg-card/70 border-2 border-dashed border-primary/30 p-3 text-center text-sm text-muted-foreground">
        Construa sua figura e clique em <strong className="text-primary">Verificar</strong>.
      </div>
    );
  }
  const ok = state === "success";
  return (
    <div
      className={`rounded-2xl p-3 border-4 shadow-card animate-pop-in ${
        ok
          ? "bg-success-bg border-success text-success-foreground"
          : "bg-destructive-bg border-destructive text-destructive animate-shake"
      }`}
    >
      <div className="flex items-start gap-2">
        <span className="text-2xl leading-none">{ok ? "🎉" : "🤔"}</span>
        <p className={`text-sm font-semibold leading-snug ${ok ? "text-success" : "text-destructive"}`}>{message}</p>
      </div>
    </div>
  );
};
