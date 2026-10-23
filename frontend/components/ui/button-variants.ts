import { cva } from "class-variance-authority"

/**
 * Variantes del botón, en un módulo SIN "use client" para poder usarlas
 * también desde Server Components (por ejemplo sobre un <Link>).
 *
 * Estética: bordes afilados, borde grueso, texto semibold en minúsculas normales.
 */
export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-sm border-2 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Negro sólido; en hover vira a gris industrial.
        default:
          "border-foreground bg-foreground text-background hover:border-neutral-800 hover:bg-neutral-800",
        // Blanco sólido (para secciones negras); en hover vira a gris claro.
        blanco:
          "border-background bg-background text-foreground hover:border-neutral-300 hover:bg-neutral-300",
        // Contorno negro (para fondos claros): se invierte en hover.
        outline:
          "border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
        // Contorno blanco (para secciones negras): se invierte en hover.
        invertido:
          "border-background bg-transparent text-background hover:bg-background hover:text-foreground",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:border-foreground",
        ghost:
          "border-transparent text-foreground hover:bg-secondary",
        destructive:
          "border-neutral-800 bg-neutral-800 text-white hover:bg-neutral-700",
        link: "border-transparent text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 gap-2 px-6",
        sm: "h-9 gap-1.5 px-4 text-xs",
        lg: "h-12 gap-2 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
