type Props = {
  src: string;
  alt: string;
  onClick?: () => void;
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
};

/** Botão que usa apenas a imagem fornecida (sem texto). */
export const ImageButton = ({ src, alt, onClick, disabled, hidden, className = "" }: Props) => {
  if (hidden) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={alt}
      className={`group transition-transform duration-150 ${
        disabled ? "opacity-40 cursor-not-allowed" : "hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer"
      } ${className}`}
    >
      <img src={src} alt={alt} className="block h-full w-auto select-none drop-shadow-lg" draggable={false} />
    </button>
  );
};
