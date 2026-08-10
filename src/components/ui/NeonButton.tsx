import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export const NeonButton = ({ children, className, variant = "primary", ...props }: NeonButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, translateY: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-heading text-lg font-extrabold text-white transition-all shadow-lg",
        variant === "primary" 
          ? "bg-gradient-to-br from-[#7f00ff] to-[#e100ff] border border-white/20 shadow-[0_10px_25px_rgba(225,0,255,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_30px_rgba(225,0,255,0.5)]"
          : "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
