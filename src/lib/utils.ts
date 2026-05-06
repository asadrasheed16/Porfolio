import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function magneticEffect(element: HTMLElement, strength: number = 40) {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const move = (e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const distanceX = mouseX - x;
    const distanceY = mouseY - y;

    // Only move if mouse is within a certain threshold of the element
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    if (distance < 150) {
      element.style.transform = `translate(${distanceX / strength}px, ${distanceY / strength}px)`;
    } else {
      element.style.transform = `translate(0px, 0px)`;
    }
  };

  const reset = () => {
    element.style.transform = `translate(0px, 0px)`;
  };

  window.addEventListener("mousemove", move);
  return () => {
    window.removeEventListener("mousemove", move);
    reset();
  };
}
