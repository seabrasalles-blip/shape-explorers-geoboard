import { useMemo, useState } from "react";
import type { Point } from "@/lib/geometry";
import { rightAngleVertices } from "@/lib/geometry";

type Props = {
  cols?: number;
  rows?: number;
  points: Point[];
  closed: boolean;
  onAddPoint: (p: Point) => void;
  onCloseShape: () => void;
  showRightAngles?: boolean;
  width?: number;
  height?: number;
};

export const Geoboard = ({
  cols = 10,
  rows = 6,
  points,
  closed,
  onAddPoint,
  onCloseShape,
  showRightAngles = true,
  width = 620,
  height = 380,
}: Props) => {
  const [hover, setHover] = useState<Point | null>(null);

  const pad = 30;
  const stepX = (width - pad * 2) / (cols - 1);
  const stepY = (height - pad * 2) / (rows - 1);

  const toPx = (p: Point) => ({
    x: pad + p.x * stepX,
    y: height - pad - p.y * stepY, // y para cima
  });

  const handleDotClick = (gx: number, gy: number) => {
    if (closed) return;
    if (points.length >= 3 && points[0].x === gx && points[0].y === gy) {
      onCloseShape();
      return;
    }
    if (points.some(p => p.x === gx && p.y === gy)) return;
    onAddPoint({ x: gx, y: gy });
  };

  const dots = useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) arr.push({ x, y });
    return arr;
  }, [cols, rows]);

  const pxPoints = points.map(toPx);
  const polygonPath = pxPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + (closed ? " Z" : "");

  // Linha "fantasma" para o próximo ponto (hover)
  const ghost = !closed && points.length > 0 && hover ? toPx(hover) : null;
  const last = pxPoints[pxPoints.length - 1];

  const rightVerts = closed && showRightAngles ? rightAngleVertices(points) : [];

  return (
    <div className="relative rounded-2xl bg-card shadow-card p-3 border-4 border-primary/20">
      <svg
        width={width}
        height={height}
        className="block rounded-xl"
        style={{ background: "hsl(var(--geo-board-bg))" }}
      >
        {/* Grade sutil */}
        <g opacity="0.15">
          {Array.from({ length: cols }).map((_, x) => (
            <line key={`v${x}`} x1={pad + x * stepX} y1={pad} x2={pad + x * stepX} y2={height - pad} stroke="hsl(var(--geo-dot))" strokeWidth={1} />
          ))}
          {Array.from({ length: rows }).map((_, y) => (
            <line key={`h${y}`} x1={pad} y1={pad + y * stepY} x2={width - pad} y2={pad + y * stepY} stroke="hsl(var(--geo-dot))" strokeWidth={1} />
          ))}
        </g>

        {/* Polígono */}
        {pxPoints.length > 1 && (
          <path
            d={polygonPath}
            fill={closed ? "hsl(var(--geo-fill) / 0.22)" : "none"}
            stroke="hsl(var(--geo-line))"
            strokeWidth={4}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}

        {/* Linha fantasma */}
        {ghost && last && (
          <line x1={last.x} y1={last.y} x2={ghost.x} y2={ghost.y} stroke="hsl(var(--geo-line))" strokeWidth={3} strokeDasharray="6 6" opacity={0.5} />
        )}

        {/* Marcações de ângulo reto */}
        {rightVerts.map((idx) => {
          const n = points.length;
          const cur = pxPoints[idx];
          const prev = pxPoints[(idx - 1 + n) % n];
          const next = pxPoints[(idx + 1) % n];
          const norm = (a: { x: number; y: number }) => {
            const m = Math.hypot(a.x, a.y) || 1;
            return { x: a.x / m, y: a.y / m };
          };
          const u = norm({ x: prev.x - cur.x, y: prev.y - cur.y });
          const v = norm({ x: next.x - cur.x, y: next.y - cur.y });
          const s = 14;
          const p1 = { x: cur.x + u.x * s, y: cur.y + u.y * s };
          const p2 = { x: cur.x + u.x * s + v.x * s, y: cur.y + u.y * s + v.y * s };
          const p3 = { x: cur.x + v.x * s, y: cur.y + v.y * s };
          return (
            <polyline
              key={`ra${idx}`}
              points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
              fill="none"
              stroke="hsl(var(--geo-right-angle))"
              strokeWidth={2.5}
            />
          );
        })}

        {/* Pontos da grade */}
        {dots.map((d) => {
          const px = pad + d.x * stepX;
          const py = height - pad - d.y * stepY;
          const isFirst = points.length > 0 && points[0].x === d.x && points[0].y === d.y;
          const isVertex = points.some(p => p.x === d.x && p.y === d.y);
          return (
            <g key={`${d.x}-${d.y}`}>
              <circle
                cx={px}
                cy={py}
                r={isFirst ? 9 : isVertex ? 7 : 5}
                fill={
                  isFirst
                    ? "hsl(var(--geo-first))"
                    : isVertex
                    ? "hsl(var(--geo-vertex))"
                    : "hsl(var(--geo-dot))"
                }
                stroke={isFirst ? "hsl(var(--geo-vertex))" : "transparent"}
                strokeWidth={2}
              />
              {/* Hit area maior */}
              <circle
                cx={px}
                cy={py}
                r={16}
                fill="transparent"
                className={closed ? "cursor-not-allowed" : "cursor-pointer"}
                onMouseEnter={() => setHover({ x: d.x, y: d.y })}
                onMouseLeave={() => setHover(null)}
                onClick={() => handleDotClick(d.x, d.y)}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
