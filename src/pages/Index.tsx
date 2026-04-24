import { useState } from "react";
import { StartScreen } from "@/components/StartScreen";
import { IntroScreen } from "@/components/IntroScreen";
import { GameScreen } from "@/components/GameScreen";

type Screen = "start" | "intro" | "game" | "final";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("start");
  // gameKey força reinicializar o estado interno do GameScreen ao reiniciar
  const [gameKey, setGameKey] = useState(0);

  const goToCapa = () => {
    setScreen("start");
    setGameKey((k) => k + 1); // reseta TODO o progresso
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-primary-glow/20 p-4">
      <div
        className="relative shadow-2xl rounded-2xl overflow-hidden border-4 border-primary/30"
        style={{ width: 1200, height: 675 }}
      >
        {screen === "start" && <StartScreen onStart={() => setScreen("intro")} />}
        {screen === "intro" && (
          <IntroScreen variant="intro" onAdvance={() => setScreen("game")} />
        )}
        {screen === "game" && (
          <GameScreen key={gameKey} onFinish={() => setScreen("final")} />
        )}
        {screen === "final" && (
          // Reutiliza a tela de introdução (mesmo componente), apenas trocando texto/função/rótulo do botão
          <IntroScreen variant="final" onAdvance={goToCapa} />
        )}
      </div>
    </div>
  );
};

export default Index;
