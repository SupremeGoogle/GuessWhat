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
      className={cn(
        "relative flex flex-col items-center justify-center rounded-3xl border border-white/10 p-4 transition-colors",
        "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl",
        active && "border-accent-cyan shadow-[0_0_20px_rgba(0,242,254,0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
