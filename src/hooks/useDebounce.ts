import { DEBOUNCE_DELAY } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function useDebounce<T>(
  value: T,
  delay: number = DEBOUNCE_DELAY,
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
