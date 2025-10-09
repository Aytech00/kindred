/** @format */

import { get } from "@/lib/api/client";
import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

interface FetchProps<TData = unknown, TError = unknown> {
  url?: string;
  key: QueryKey;
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">;
}

export default function useFetch<TData = unknown, TError = unknown>({
  key,
  url,
  options,
}: FetchProps<TData, TError>) {
  const fetchData = async (): Promise<TData> => {
    if (!url) throw new Error("URL is required");
    const res = await get(url);
    return res as TData;
  };

  return useQuery<TData, TError>({
    queryKey: key,
    queryFn: url ? fetchData : undefined,
    enabled: !!url,
    refetchOnWindowFocus: false,
    ...options,
  });
}
