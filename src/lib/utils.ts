import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Равномерная перетасовка Фишера-Йетса. В отличие от `array.sort(() => 0.5 - Math.random())`
 * даёт математически равновероятную перестановку без смещения к исходному порядку.
 */
export function fisherYatesShuffle<T>(input: readonly T[]): T[] {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
