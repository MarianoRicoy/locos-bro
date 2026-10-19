import { cva } from "class-variance-authority"

/**
 * Variantes del botón, en un módulo SIN "use client" para poder usarlas
 * también desde Server Components (por ejemplo sobre un <Link>).
 */
export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border bg-clip-padding text-sm font-bold tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
        accent:
          "border-accent bg-accent text-accent-foreground hover:bg-accent/90",
        outline:
          "border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/5",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost:
          "border-transparent text-foreground hover:bg-muted",
        destructive:
          "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
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
