import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export const NeonButton = ({ children, className, variant = "primary", disabled, ...props }: NeonButtonProps) => {
  return (
    <motion.button
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      disabled={disabled}
      className={cn("neon-btn", variant === "primary" ? "neon-btn--primary" : "neon-btn--secondary", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
