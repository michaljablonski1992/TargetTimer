import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function humanSeconds(seconds: number, toFixed?: boolean) {
  const secondsVal = toFixed ? seconds.toFixed(3) : seconds;
  const secondsPlural = seconds !== 1;
  return `${secondsVal} second${secondsPlural ? 's' : ''}`;
}

export function getAccuracy(targetTime: number, difference: number | null) {
  if (!difference) { return 0; }
  const accuracy = (1 - (difference / targetTime)) * 100;
  return roundTo(accuracy, 2);
}

// get class for award
export function getAward(accuracy: number) {
  if (accuracy < 70) return null;
  if (accuracy < 80) return 'bronze';
  if (accuracy < 90) return 'silver';
  if (accuracy < 100) return 'gold';
  if (accuracy === 100) return 'diamond';
  return null;
}

export const roundTo = (num: number, decimals: number): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
};
