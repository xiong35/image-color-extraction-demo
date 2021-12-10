import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery<T extends Record<string, string>>() {
  const { search } = useLocation();

  return useMemo(() => {
    const URLSearch = new URLSearchParams(search);
    return {
      get<K extends keyof T>(key: K) {
        return URLSearch.get(key.toString()) as T[K];
      },
    };
  }, [search]);
}
