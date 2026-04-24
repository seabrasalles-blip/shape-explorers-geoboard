// Validação geométrica – Exploradores das Formas
// Coordenadas em unidades de grade (inteiros), polígono é fechado implicitamente.

export type Point = { x: number; y: number };

export const EPSILON = 0.0001;

const sub = (a: Point, b: Point): Point => ({ x: a.x - b.x, y: a.y - b.y });
const dot = (a: Point, b: Point) => a.x * b.x + a.y * b.y;
const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;
const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const eq = (a: number, b: number, eps = EPSILON) => Math.abs(a - b) < eps;

/** Quantidade de lados de um polígono fechado. */
export const countSides = (pts: Point[]): number => {
  if (!pts || pts.length < 3) return 0;
  return pts.length;
};

/** Conta vértices com ângulo reto (90°). */
export const countRightAngles = (pts: Point[]): number => {
  const n = pts.length;
  if (n < 3) return 0;
  let count = 0;
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const cur = pts[i];
    const next = pts[(i + 1) % n];
    const v1 = sub(prev, cur);
    const v2 = sub(next, cur);
    const m1 = Math.hypot(v1.x, v1.y);
    const m2 = Math.hypot(v2.x, v2.y);
    if (m1 < EPSILON || m2 < EPSILON) continue;
    // produto escalar normalizado ≈ 0  => ângulo reto
    const cos = dot(v1, v2) / (m1 * m2);
    if (Math.abs(cos) < 1e-3) count++;
  }
  return count;
};

const sideLengths = (pts: Point[]): number[] => {
  const n = pts.length;
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(dist(pts[i], pts[(i + 1) % n]));
  return out;
};

const isSimplePolygon = (pts: Point[]): boolean => {
  // Verifica que arestas não-adjacentes não se cruzam
  const n = pts.length;
  if (n < 3) return false;
  const segIntersect = (p1: Point, p2: Point, p3: Point, p4: Point): boolean => {
    const d1 = cross(sub(p4, p3), sub(p1, p3));
    const d2 = cross(sub(p4, p3), sub(p2, p3));
    const d3 = cross(sub(p2, p1), sub(p3, p1));
    const d4 = cross(sub(p2, p1), sub(p4, p1));
    if (((d1 > EPSILON && d2 < -EPSILON) || (d1 < -EPSILON && d2 > EPSILON)) &&
        ((d3 > EPSILON && d4 < -EPSILON) || (d3 < -EPSILON && d4 > EPSILON))) return true;
    return false;
  };
  for (let i = 0; i < n; i++) {
    const a1 = pts[i];
    const a2 = pts[(i + 1) % n];
    for (let j = i + 1; j < n; j++) {
      if (j === i) continue;
      if ((j + 1) % n === i || (i + 1) % n === j) continue;
      const b1 = pts[j];
      const b2 = pts[(j + 1) % n];
      if (segIntersect(a1, a2, b1, b2)) return false;
    }
  }
  return true;
};

export const isQuadrilateral = (pts: Point[]): boolean => {
  if (countSides(pts) !== 4) return false;
  if (!isSimplePolygon(pts)) return false;
  // Nenhum lado pode ter comprimento ≈ 0 e três pontos consecutivos não podem ser colineares
  const n = 4;
  const lens = sideLengths(pts);
  if (lens.some(l => l < EPSILON)) return false;
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const cur = pts[i];
    const next = pts[(i + 1) % n];
    if (Math.abs(cross(sub(next, cur), sub(prev, cur))) < EPSILON) return false;
  }
  return true;
};

export const isSquare = (pts: Point[]): boolean => {
  if (!isQuadrilateral(pts)) return false;
  const lens = sideLengths(pts);
  const ref = lens[0];
  if (!lens.every(l => eq(l, ref))) return false;
  return countRightAngles(pts) === 4;
};

export const isRectangle = (pts: Point[]): boolean => {
  if (!isQuadrilateral(pts)) return false;
  if (countRightAngles(pts) !== 4) return false;
  const lens = sideLengths(pts);
  // lados opostos iguais
  if (!eq(lens[0], lens[2]) || !eq(lens[1], lens[3])) return false;
  // não aceita quadrado
  if (eq(lens[0], lens[1])) return false;
  return true;
};

const areParallel = (a1: Point, a2: Point, b1: Point, b2: Point): boolean => {
  const u = sub(a2, a1);
  const v = sub(b2, b1);
  return Math.abs(cross(u, v)) < EPSILON;
};

/** Trapézio escolar: exatamente UM par de lados paralelos. */
export const isSchoolTrapezoid = (pts: Point[]): boolean => {
  if (!isQuadrilateral(pts)) return false;
  const p = pts;
  const par1 = areParallel(p[0], p[1], p[2], p[3]); // lados opostos 1
  const par2 = areParallel(p[1], p[2], p[3], p[0]); // lados opostos 2
  // Exatamente um par paralelo (XOR)
  return (par1 && !par2) || (!par1 && par2);
};

export const isRhombus = (pts: Point[]): boolean => {
  if (!isQuadrilateral(pts)) return false;
  const lens = sideLengths(pts);
  const ref = lens[0];
  if (!lens.every(l => eq(l, ref))) return false;
  // não aceita quadrado
  if (countRightAngles(pts) === 4) return false;
  return true;
};

/** Vértices que formam ângulo reto (índices). */
export const rightAngleVertices = (pts: Point[]): number[] => {
  const n = pts.length;
  const out: number[] = [];
  if (n < 3) return out;
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const cur = pts[i];
    const next = pts[(i + 1) % n];
    const v1 = sub(prev, cur);
    const v2 = sub(next, cur);
    const m1 = Math.hypot(v1.x, v1.y);
    const m2 = Math.hypot(v2.x, v2.y);
    if (m1 < EPSILON || m2 < EPSILON) continue;
    const cos = dot(v1, v2) / (m1 * m2);
    if (Math.abs(cos) < 1e-3) out.push(i);
  }
  return out;
};

export const isTriangle = (pts: Point[]): boolean => {
  if (countSides(pts) !== 3) return false;
  if (!isSimplePolygon(pts)) return false;
  return Math.abs(cross(sub(pts[1], pts[0]), sub(pts[2], pts[0]))) > EPSILON;
};

export const isPentagon = (pts: Point[]): boolean => countSides(pts) === 5 && isSimplePolygon(pts);
export const isHexagon = (pts: Point[]): boolean => countSides(pts) === 6 && isSimplePolygon(pts);

/** Triângulo retângulo: exatamente 1 ângulo reto. */
export const isRightTriangle = (pts: Point[]): boolean => {
  if (!isTriangle(pts)) return false;
  return countRightAngles(pts) === 1;
};
