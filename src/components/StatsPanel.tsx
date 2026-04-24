import type { Point } from "@/lib/geometry";
import { countSides, countRightAngles } from "@/lib/geometry";

type Props = {
  points: Point[];
  closed: boolean;
  completedCount: number;
  totalMissions: number;
};

export const StatsPanel = ({ points, closed, completedCount, totalMissions }: Props) => {
  const sides = closed ? countSides(points) : Math.max(0, points.length - 1);
  const vertices = points.length;
  const rights = closed ? countRightAngles(points) : 0;

  const Stat = ({ label, value, color }: { label: string; value: number | string; color: string }) => (
    <div className={`rounded-xl ${color} p-2 text-center`}>
      <div className="text-2xl font-display leading-none">{value}</div>
      <div className="text-[10px] uppercase tracking-wider font-bold opacity-80 mt-1">{label}</div>
    </div>
  );

  return (
    <div className="rounded-2xl bg-card border-4 border-primary/20 shadow-card p-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 text-center">Sua figura</h4>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <Stat label="Vértices" value={vertices} color="bg-accent text-accent-foreground" />
        <Stat label="Lados" value={sides} color="bg-primary/10 text-primary" />
        <Stat label="Ret." value={rights} color="bg-success/15 text-success" />
      </div>
      <div className="rounded-xl bg-secondary/30 p-2 text-center">
        <div className="text-xs uppercase tracking-wider font-bold text-secondary-foreground/70">Progresso</div>
        <div className="text-lg font-display text-secondary-foreground">
          {completedCount} / {totalMissions}
        </div>
      </div>
    </div>
  );
};
