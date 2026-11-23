import { HTMLMotionProps, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export const NeonButton = ({ children, className, variant = "primary", disabled, ...props }: NeonButtonProps) => {
  const reduce = useReducedMotion();
  const pressY = variant === "primary" ? 3 : variant === "secondary" ? 2 : 0;
  return (
    <motion.button
      whileHover={disabled || reduce ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : reduce ? { scale: 0.98 } : { y: pressY, scale: variant === "ghost" ? 0.96 : 0.99 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      disabled={disabled}
      className={cn("neon-btn", `neon-btn--${variant}`, className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
