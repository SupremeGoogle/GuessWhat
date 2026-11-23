import { HTMLMotionProps, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export const GlassCard = ({ children, className, active, ...props }: GlassCardProps) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className={cn("glass-card", active && "is-active", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
