import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navigateToLeadForm = () => {
  const leadFormSection = document.getElementById(
    "lead-form-section",
  ) as HTMLElement;

  leadFormSection?.scrollIntoView({ behavior: "smooth" });
};
