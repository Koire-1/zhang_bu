import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface DivinationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold";
}

const DivinationButton = forwardRef<HTMLButtonElement, DivinationButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(220,38,38,0.4)]",
      secondary: "bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-[0_0_20px_rgba(185,28,28,0.3)]",
      gold: "bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_0_30px_rgba(234,179,8,0.4)]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300",
          "hover:scale-105 active:scale-95",
          "border-2 border-current/20",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DivinationButton.displayName = "DivinationButton";

export default DivinationButton;
