import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatProblemNumber(num: number): string {
  return String(num).padStart(3, '0')
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toUpperCase()) {
    case 'EASY':
      return 'text-easy'
    case 'MEDIUM':
      return 'text-medium'
    case 'HARD':
      return 'text-hard'
    default:
      return 'text-muted-foreground'
  }
}

export function getDifficultyBg(difficulty: string): string {
  switch (difficulty.toUpperCase()) {
    case 'EASY':
      return 'bg-easy/10 text-easy border-easy/20'
    case 'MEDIUM':
      return 'bg-medium/10 text-medium border-medium/20'
    case 'HARD':
      return 'bg-hard/10 text-hard border-hard/20'
    default:
      return 'bg-muted text-muted-foreground'
  }
}
