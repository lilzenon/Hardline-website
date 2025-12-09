import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 * 
 * @example
 * cn("bg-red-500", "bg-blue-500") // Returns "bg-blue-500" (last wins)
 * cn("px-4 py-2", condition && "text-red-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

