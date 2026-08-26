import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
        outline: "border-border bg-transparent text-foreground hover:border-accent hover:text-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-muted hover:text-foreground",
        destructive: "bg-destructive text-primary-foreground hover:bg-destructive/80",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-11 gap-1.5 px-4 py-2",
        xs: "min-h-9 gap-1 px-3 py-1 text-xs",
        sm: "min-h-10 gap-1 px-3 py-1.5 text-xs",
        lg: "min-h-12 gap-1.5 px-5 py-3",
        icon: "size-11",
        "icon-xs": "size-9",
        "icon-sm": "size-10",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ComponentProps<typeof ButtonPrimitive> & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
