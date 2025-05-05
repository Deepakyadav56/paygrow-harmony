
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-fountain-blue-600 text-white hover:bg-fountain-blue-700",
        secondary:
          "border-transparent bg-fountain-blue-100 text-fountain-blue-800 hover:bg-fountain-blue-200",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-fountain-blue-200",
        success: "border-transparent bg-fountain-blue-100 text-fountain-blue-800",
        warning: "border-transparent bg-yellow-100 text-yellow-800",
        info: "border-transparent bg-fountain-blue-50 text-fountain-blue-600",
        premium: "border-transparent bg-gradient-to-r from-fountain-blue-600 to-fountain-blue-800 text-white shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
