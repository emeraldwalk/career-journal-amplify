import { useEffect, useState } from "react";

export function useDebounce<T>(
  value: T,
  timeoutMs: number,
): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(value);
    }, timeoutMs);

    return function cleanup() {
      clearTimeout(timeout);
    };
  }, [value, timeoutMs]);

  return debounced;
}