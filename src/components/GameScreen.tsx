import { useState } from "react";
const capa = "/assets/capa.png";
const desfazerImg = "/assets/desfazer.png";
const limparImg = "/assets/limpar.png";
const verificarImg = "/assets/verificar.png";
const proximaImg = "/assets/proxima.png";
const reiniciarImg = "/assets/reiniciar.png";

import { Geoboard } from "./Geoboard";
import { MissionPanel } from "./MissionPanel";
import { FeedbackBox } from "./FeedbackBox";
import { StatsPanel } from "./StatsPanel";
import { ImageButton } from "./ImageButton";

import { MISSIONS } from "@/lib/missions";
import type { Point } from "@/lib/geometry";

type Props = {
  onFinish: () => void;
};

export const GameScreen = ({ onFinish }: Props) => {
  const [missionIdx, setMissionIdx] = useState(0);
  const [points, setPoints] = useState<Point[]>([]);
  const [closed, setClosed] = useState(false);
  const [feedback, setFeedback] = useState<{ state: "idle" | "success" | "error"; message: string }>({
    state: "idle",
    message: "",
  });
  const [completed, setCompleted] = useState(0);

  const mission = MISSIONS[missionIdx];
  const isLastMission = missionIdx === MISSIONS.length - 1;
  const missionSolved = feedback.state === "success";

  const resetCanvas = () => {
    setPoints([]);
    setClosed(false);
    setFeedback({ state: "idle", message: "" });
  };

  const handleAddPoint = (p: Point) => {
    if (closed) return;
    setPoints((cur) => [...cur, p]);
    if (feedback.state !== "idle") setFeedback({ state: "idle", message: "" });
  };

  const handleClose = () => {
    if (points.length < 3) return;
    setClosed(true);
  };

  const handleUndo = () => {
    if (closed) {
      setClosed(false);
      setFeedback({ state: "idle", message: "" });
      return;
    }
    setPoints((cur) => cur.slice(0, -1));
    if (feedback.state !== "idle") setFeedback({ state: "idle", message: "" });
  };

  const handleClear = () => resetCanvas();

  const handleVerify = () => {
    if (points.length < 3) {
      setFeedback({ state: "error", message: "Construa um polígono com pelo menos 3 vértices." });
      return;
    }
    // fechar automaticamente para validar
    if (!closed) setClosed(true);
    const result = mission.validate(points);
    if (result.ok) {
      setFeedback({ state: "success", message: result.message });
      setCompleted((c) => Math.max(c, missionIdx + 1));
    } else {
      setFeedback({ state: "error", message: result.message });
    }
  };

  const handleAdvance = () => {
    if (isLastMission) {
      // Última tarefa concluída → vai para tela final
      onFinish();
      return;
    }
    setMissionIdx((i) => i + 1);
    resetCanvas();
  };

  // Conforme as regras: na última tarefa, após acertar, o MESMO botão muda para "Reiniciar tarefa" (visual)
  const advanceButtonImg = isLastMission && missionSolved ? reiniciarImg : proximaImg;
  const advanceButtonAlt = isLastMission && missionSolved ? "Reiniciar tarefa" : "Próxima";

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundImage: `url(${capa})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/30" />

      <div className="relative z-10 grid grid-cols-[1fr_320px] gap-6 p-6 h-full">
        {/* Coluna esquerda: geoplano + ações */}
        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center justify-between w-full px-2">
            <h2 className="font-display text-3xl text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.3)]">
              Exploradores das Formas
            </h2>
            <div className="bg-card/95 rounded-full px-4 py-1.5 text-sm font-bold text-primary shadow-card">
              Tarefa {missionIdx + 1}/{MISSIONS.length}
            </div>
          </div>

          <Geoboard
            cols={10}
            rows={6}
            points={points}
            closed={closed}
            onAddPoint={handleAddPoint}
            onCloseShape={handleClose}
            width={620}
            height={380}
          />

          {/* Botões */}
          <div className="flex items-end justify-center gap-4 h-24 mt-2">
            <ImageButton
              src={desfazerImg}
              alt="Desfazer"
              onClick={handleUndo}
              disabled={points.length === 0}
              className="h-20"
            />
            <ImageButton
              src={limparImg}
              alt="Limpar"
              onClick={handleClear}
              disabled={points.length === 0}
              className="h-20"
            />
            <ImageButton
              src={verificarImg}
              alt="Verificar"
              onClick={handleVerify}
              disabled={points.length < 3}
              className="h-20"
            />
            <ImageButton
              src={advanceButtonImg}
              alt={advanceButtonAlt}
              onClick={handleAdvance}
              hidden={!missionSolved}
              className={`h-20 ${isLastMission && missionSolved ? "animate-wiggle" : ""}`}
            />
          </div>
        </div>

        {/* Coluna direita: tarefa + stats + feedback */}
        <div className="flex flex-col gap-3 justify-between py-1">
          <MissionPanel mission={mission} index={missionIdx} total={MISSIONS.length} />
          <StatsPanel
            points={points}
            closed={closed}
            completedCount={completed}
            totalMissions={MISSIONS.length}
          />
          <FeedbackBox state={feedback.state} message={feedback.message} />

          <div className="text-[11px] text-white/90 text-center bg-primary/40 backdrop-blur-sm rounded-lg p-2">
            Clique nos pontos para criar vértices.<br />
            Clique no <span className="text-secondary font-bold">ponto amarelo</span> para fechar a figura.
          </div>
        </div>
      </div>
    </div>
  );
};
