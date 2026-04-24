import type { Mission } from "@/lib/missions";

type Props = {
  mission: Mission;
  index: number;
  total: number;
};

export const MissionPanel = ({ mission, index, total }: Props) => {
  return (
    <div className="rounded-2xl bg-card border-4 border-primary/20 shadow-card p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-accent px-2 py-1 rounded-full">
          Missão {index + 1} de {total}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-3 rounded-full transition-colors ${
                i < index ? "bg-success" : i === index ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
      <h3 className="font-display text-lg text-foreground leading-tight mb-1">{mission.title}</h3>
      <p className="text-sm text-foreground/90 leading-snug mb-2">{mission.goal}</p>
      <div className="flex items-start gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
        <span className="font-bold">💡</span>
        <span>{mission.hint}</span>
      </div>
    </div>
  );
};
