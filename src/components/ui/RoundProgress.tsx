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
      className={cn("round-progress", className)}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Раунд ${current} из ${total}`}
    >
      {Array.from({ length: total }, (_, index) => {
        const isCompleted = index < current - 1;
        const isActive = index === current - 1;

        return (
          <div
            key={index}
            className={cn("round-seg", isCompleted && "is-done", isActive && "is-active")}
          >
            <div className="round-seg-fill" />
          </div>
        );
      })}
    </div>
  );
};
