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
         
        <h1 className="font-display text-7xl leading-none mt-3 drop-shadow-[0_5px_0_rgba(0,0,0,0.22)]">
  <span className="text-secondary [text-shadow:0_3px_0_rgba(255,255,255,0.65),0_6px_0_rgba(0,0,0,0.18)]">
    Exploradores
  </span>
  <br />
  <span className="text-secondary [text-shadow:0_3px_0_rgba(255,255,255,0.65),0_6px_0_rgba(0,0,0,0.18)]">
    das Formas
  </span>
</h1>

<p className="font-display text-3xl mt-4 text-primary [text-shadow:0_2px_0_rgba(255,255,255,0.75),0_4px_0_rgba(0,0,0,0.16)]">
  Tarefa Geoplano
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
