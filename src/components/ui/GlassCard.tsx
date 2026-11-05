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
      className={cn("glass-card", active && "is-active", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
