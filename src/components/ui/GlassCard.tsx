import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export const GlassCard = ({ children, className, active, ...props }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className={cn("glass-card", active && "is-active", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
