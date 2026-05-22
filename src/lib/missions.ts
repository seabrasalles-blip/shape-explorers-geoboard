import type { Point } from "@/lib/geometry";
import {
  countSides,
  countRightAngles,
  isQuadrilateral,
  isSquare,
  isRectangle,
  isSchoolTrapezoid,
  isRhombus,
  isTriangle,
  isPentagon,
  isHexagon,
  isRightTriangle,
} from "@/lib/geometry";

export type ValidationResult = {
  ok: boolean;
  message: string;
};

export type Mission = {
  id: number;
  title: string;
  goal: string;
  hint: string;
  validate: (pts: Point[]) => ValidationResult;
};

const need = (cond: boolean, ok: string, fail: string): ValidationResult =>
  ({ ok: cond, message: cond ? ok : fail });

export const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "Missão 1 – O primeiro triângulo",
    goal: "Construa um triângulo qualquer no geoplano.",
    hint: "Lembre: 3 vértices e 3 lados.",
    validate: (p) => need(
      isTriangle(p),
      "Excelente! Você construiu um triângulo com 3 lados e 3 vértices.",
      "Ainda não é um triângulo. Verifique se há exatamente 3 vértices não alinhados."
    ),
  },
  {
    id: 2,
    title: "Missão 2 – Triângulo retângulo",
    goal: "Construa um triângulo que tenha 1 ângulo reto.",
    hint: "Um cantinho deve formar um L perfeito.",
    validate: (p) => need(
      isRightTriangle(p),
      "Muito bem! Esse triângulo tem 1 ângulo reto.",
      "Esse triângulo não tem ângulo reto. Procure formar um cantinho como a quina de um livro."
    ),
  },
  {
    id: 3,
    title: "Missão 3 – Quadrilátero livre",
    goal: "Construa um quadrilátero qualquer (4 lados).",
    hint: "Qualquer figura fechada com 4 vértices.",
    validate: (p) => need(
      isQuadrilateral(p),
      "Boa! Você construiu um quadrilátero com 4 lados e 4 vértices.",
      "Ainda não é um quadrilátero. Use exatamente 4 vértices e não cruze os lados."
    ),
  },
  {
    id: 4,
    title: "Missão 4 – Caça aos ângulos retos",
    goal: "Construa um quadrilátero com pelo menos 2 ângulos retos.",
    hint: "Pelo menos dois cantinhos em forma de L.",
    validate: (p) => {
      if (!isQuadrilateral(p)) return { ok: false, message: "Primeiro construa um quadrilátero (4 lados)." };
      const r = countRightAngles(p);
      return need(r >= 2, `Ótimo! Encontramos ${r} ângulos retos nesse quadrilátero.`, `Esse quadrilátero tem ${r} ângulo(s) reto(s). Precisamos de pelo menos 2.`);
    },
  },
  {
    id: 5,
    title: "Missão 5 – O retângulo",
    goal: "Construa um retângulo (4 ângulos retos, lados opostos iguais e diferentes).",
    hint: "Lados opostos iguais, mas não todos iguais.",
    validate: (p) => need(
      isRectangle(p),
      "Perfeito! É um retângulo: 4 ângulos retos e lados opostos iguais.",
      "Esse não é um retângulo. Lembre: 4 ângulos retos, lados opostos iguais e os 4 lados não podem ter o mesmo tamanho."
    ),
  },
  {
    id: 6,
    title: "Missão 6 – O quadrado",
    goal: "Construa um quadrado (4 lados iguais e 4 ângulos retos).",
    hint: "É um retângulo com todos os lados iguais.",
    validate: (p) => need(
      isSquare(p),
      "Excelente! É um quadrado: 4 lados iguais e 4 ângulos retos.",
      "Esse não é um quadrado. Os 4 lados precisam ser iguais e os 4 ângulos retos."
    ),
  },
  {
    id: 7,
    title: "Missão 7 – O trapézio",
    goal: "Construa um trapézio (apenas 1 par de lados paralelos).",
    hint: "Só um par de lados paralelos – os outros dois não.",
    validate: (p) => need(
      isSchoolTrapezoid(p),
      "Boa! Esse é um trapézio: apenas um par de lados paralelos.",
      "Esse não é um trapézio escolar. Apenas UM par de lados deve ser paralelo."
    ),
  },
  {
    id: 8,
    title: "Missão 8 – O pentágono",
    goal: "Construa um polígono com 5 lados (pentágono).",
    hint: "5 vértices, 5 lados, sem cruzamentos.",
    validate: (p) => need(
      isPentagon(p),
      "Excelente! Você construiu um pentágono com 5 lados.",
      "Ainda não é um pentágono. Use exatamente 5 vértices e não cruze os lados."
    ),
  },
  {
    id: 9,
    title: "Missão 9 – O hexágono",
    goal: "Construa um polígono com 6 lados (hexágono).",
    hint: "6 vértices, 6 lados, sem cruzamentos.",
    validate: (p) => need(
      isHexagon(p),
      "Boa! É um hexágono com 6 lados.",
      "Ainda não é um hexágono. Use exatamente 6 vértices e não cruze os lados."
    ),
  },
  {
    id: 10,
    title: "Missão 10 – Quadrilátero sem ângulos retos",
    goal: "Construa um quadrilátero sem nenhum ângulo reto.",
    hint: "4 lados, mas nenhum cantinho em L.",
    validate: (p) => {
      if (!isQuadrilateral(p)) return { ok: false, message: "Primeiro construa um quadrilátero (4 lados)." };
      const r = countRightAngles(p);
      return need(r === 0, "Muito bem! Esse quadrilátero não tem nenhum ângulo reto.", `Esse quadrilátero tem ${r} ângulo(s) reto(s). Procure uma figura sem nenhum.`);
    },
  },
  {
    id: 11,
    title: "Missão 11 – Triângulo isósceles",
    goal: "Construa um triângulo com pelo menos 2 lados iguais.",
    hint: "Dois lados do mesmo tamanho.",
    validate: (p) => {
      if (!isTriangle(p)) return { ok: false, message: "Primeiro construa um triângulo." };
      const a = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      const b = Math.hypot(p[1].x - p[2].x, p[1].y - p[2].y);
      const c = Math.hypot(p[2].x - p[0].x, p[2].y - p[0].y);
      const eq = (x: number, y: number) => Math.abs(x - y) < 1e-4;
      return need(eq(a, b) || eq(b, c) || eq(a, c), "Boa! Esse triângulo é isósceles (pelo menos 2 lados iguais).", "Esse triângulo não é isósceles. Tente novamente com 2 lados iguais.");
    },
  },
  {
    id: 12,
    title: "Missão 12 – Polígono com 4 ângulos retos",
    goal: "Construa um polígono com exatamente 4 ângulos retos (pode ser quadrado ou retângulo).",
    hint: "Quadrado ou retângulo!",
    validate: (p) => {
      if (countSides(p) < 4) return { ok: false, message: "Construa um polígono com pelo menos 4 lados." };
      const r = countRightAngles(p);
      return need(r === 4, "Excelente! Polígono com exatamente 4 ângulos retos. Você completou todas as missões!", `Esse polígono tem ${r} ângulo(s) reto(s). Precisamos de exatamente 4.`);
    },
  },
];
