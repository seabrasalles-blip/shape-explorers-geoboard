const fundo = "/assets/fundo.png";
const coruja = "/assets/coruja.png";

type Props = { onStart: () => void };

export const StartScreen = ({ onStart }: Props) => {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundImage: `url(${fundo})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Camada para garantir contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/30" />

      {/* Título central */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-12">
        <div className="text-center animate-pop-in">
          <p className="font-display text-2xl text-white text-stroke-white" style={{ WebkitTextStroke: "0", color: "hsl(var(--primary))" }}>
            ✦ Atividade de Matemática ✦
          </p>
          <h1 className="font-display text-7xl leading-none mt-3 text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.25)]">
            Exploradores
            <br />
            <span className="text-secondary">das Formas</span>
          </h1>
          <p className="font-display text-3xl text-white mt-3 drop-shadow-[0_3px_0_rgba(0,0,0,0.25)]">
            Missão Geoplano
          </p>

          <button
            onClick={onStart}
            className="mt-10 inline-flex items-center gap-3 bg-secondary text-secondary-foreground font-display text-2xl px-10 py-4 rounded-full shadow-soft border-4 border-white/80 hover:scale-105 active:scale-95"
          >
            ▶ Começar
          </button>
        </div>
      </div>

      {/* Coruja canto inferior esquerdo */}
      <img
        src={coruja}
        alt="Coruja guia"
        className="absolute bottom-0 left-4 w-80 h-auto drop-shadow-2xl pointer-events-none select-none"
        draggable={false}
      />
    </div>
  );
};