import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
/**
 * Tailwind util to merge css classes
 * @param inputs css classes
 * @returns
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

