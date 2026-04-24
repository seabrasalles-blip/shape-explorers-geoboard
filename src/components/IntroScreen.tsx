import capa from "/assets/capa.png";
import coruja from "/assets/coruja.png";
import reiniciarImg from "/assets/reiniciar.png";
import proximaImg from "/assets/proxima.png";

type Props = {
  variant: "intro" | "final";
  onAdvance: () => void;
};

const INTRO_TEXT =
  "Olá, explorador! Eu sou a Coruja Geo. No geoplano você cria figuras clicando nos pontos. Cada missão pede um polígono diferente: triângulos, quadrados, retângulos, losangos, trapézios e até hexágonos! Observe lados, vértices e ângulos retos. Pronto para começar?";

const FINAL_TEXT =
  "Parabéns, explorador! Você completou todas as 14 missões e dominou os polígonos: lados, vértices, ângulos retos e suas propriedades. Você é oficialmente um Explorador das Formas! Quer reviver a aventura desde o início?";

export const IntroScreen = ({ variant, onAdvance }: Props) => {
  const isFinal = variant === "final";
  const text = isFinal ? FINAL_TEXT : INTRO_TEXT;
  const buttonImg = isFinal ? reiniciarImg : proximaImg;
  const buttonAlt = isFinal ? "Reiniciar missão" : "Iniciar missão";

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundImage: `url(${capa})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex items-center justify-center gap-8 px-16">
        {/* Coruja à esquerda */}
        <img
          src={coruja}
          alt="Coruja guia"
          className="w-[320px] h-auto drop-shadow-2xl animate-float select-none"
          draggable={false}
        />

        {/* Balão de fala */}
        <div className="relative max-w-xl animate-fade-in">
          <div
            className={`relative rounded-[2rem] p-8 border-[6px] shadow-soft ${
              isFinal ? "bg-success-bg border-success" : "bg-card border-primary"
            }`}
          >
            {/* Bico do balão */}
            <div
              className={`absolute -left-6 top-12 w-0 h-0 border-y-[18px] border-y-transparent border-r-[24px] ${
                isFinal ? "border-r-success" : "border-r-primary"
              }`}
            />
            <div
              className={`absolute -left-3 top-[54px] w-0 h-0 border-y-[12px] border-y-transparent border-r-[18px] ${
                isFinal ? "border-r-success-bg" : "border-r-card"
              }`}
            />

            <h2 className={`font-display text-3xl mb-3 ${isFinal ? "text-success" : "text-primary"}`}>
              {isFinal ? "🏆 Missão Cumprida!" : "👋 Bem-vindo!"}
            </h2>
            <p className="text-foreground text-lg leading-relaxed">{text}</p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onAdvance}
                aria-label={buttonAlt}
                className="group transition-transform duration-150 hover:-translate-y-1 hover:scale-105 active:scale-95"
              >
                <img
                  src={buttonImg}
                  alt={buttonAlt}
                  className="h-20 w-auto drop-shadow-xl select-none"
                  draggable={false}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
