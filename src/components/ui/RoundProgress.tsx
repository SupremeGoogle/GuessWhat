import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface RoundProgressProps {
  /** Текущий раунд, 1-индексированный (как `round` в GameLevel). */
  current: number;
  /** Всего раундов в сессии уровня. */
  total: number;
  className?: string;
}

/**
 * Компактная полоса прогресса раундов уровня — `total` сегментов, каждый
 * соответствует одному раунду. Пройденные раунды и текущий подсвечены
 * неоновым градиентом (текущий ещё и мягко пульсирует), оставшиеся —
 * приглушённое стекло. Дублирует текстовый счётчик «Задание N/M» в шапке
 * визуально, чтобы прогресс считывался с одного взгляда, без счёта в уме.
 */
export const RoundProgress = ({ current, total, className }: RoundProgressProps) => {
  return (
    <div
      className={cn("flex items-center gap-1.5 w-full", className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Раунд ${current} из ${total}`}
    >
      {Array.from({ length: total }, (_, index) => {
        const isCompleted = index < current - 1;
        const isActive = index === current - 1;
        const isLit = isCompleted || isActive;

        return (
          <motion.div
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              isLit
                ? "bg-gradient-to-r from-[#00f2fe] to-[#8a2be2] shadow-[0_0_8px_rgba(0,242,254,0.8)]"
                : "bg-white/10"
            )}
            initial={false}
            animate={
              isActive
                ? { opacity: [0.75, 1, 0.75] }
                : { opacity: 1 }
            }
            transition={
              isActive
                ? { duration: 1.3, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
};
