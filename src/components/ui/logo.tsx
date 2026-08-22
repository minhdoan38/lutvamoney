import Image from "next/image";

export type LogoVariant =
  | "primary-dark"
  | "outline-light"
  | "monochrome-dark"
  | "outline-dark";

interface LogoProps {
  variant?: LogoVariant;
  size?: number;
  className?: string;
  alt?: string;
}

const LOGO_MAP: Record<LogoVariant, string> = {
  "primary-dark": "/logo/logo-mark-primary-dark.svg",
  "outline-light": "/logo/logo-mark-outline-light.svg",
  "monochrome-dark": "/logo/logo-mark-monochrome-dark.svg",
  "outline-dark": "/logo/logo-mark-outline-dark.svg",
};

export function Logo({
  variant = "primary-dark",
  size = 32,
  className = "",
  alt = "Nét Nút Studio Mark",
}: LogoProps) {
  return (
    <Image
      src={LOGO_MAP[variant]}
      alt={alt}
      width={size}
      height={size}
      priority={variant === "primary-dark"}
      className={`inline-block shrink-0 ${className}`}
    />
  );
}
