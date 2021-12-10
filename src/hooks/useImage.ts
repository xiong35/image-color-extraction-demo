import { useRef } from "react";

export function useImage() {
  const imageRef = useRef<HTMLImageElement>(null);

  return { imageRef };
}
