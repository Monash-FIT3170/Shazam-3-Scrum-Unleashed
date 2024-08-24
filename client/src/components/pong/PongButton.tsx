import { ButtonHTMLAttributes } from "react";

interface PongButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
}

export function PongButton({ src, ...buttonProps }: PongButtonProps) {
  return (
    <button {...buttonProps} className="py-1">
      <img src={src} className="h-20 outline-none pointer-events-none" />
    </button>
  );
}
