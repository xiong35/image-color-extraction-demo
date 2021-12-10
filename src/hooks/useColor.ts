import { useState } from "react";

export function useColor() {
  const [colors, setColors] = useState();

  return { colors, setColors };
}
