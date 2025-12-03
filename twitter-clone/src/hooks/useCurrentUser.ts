// twitter-clone/src/hooks/useCurrentUser.ts

import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { useSession } from "next-auth/react"; // 👈 IMPORT useSession

export default function useCurrentUser () {
  const { status } = useSession(); // 👈 Get authentication status

  // 1. Conditionally set the URL (key) for SWR
  // The key is "/api/current" ONLY if the status is "authenticated".
  // Otherwise, the key is null, which disables SWR fetching.
  const shouldFetch = status === 'authenticated' ? "/api/current" : null;

  const { data, error, isLoading, mutate } = useSWR(shouldFetch, fetcher);

  // If status is "loading" (checking the session), then we should also show loading state
  const combinedIsLoading = status === 'loading' || isLoading;

  return {
    data,
    error,
    isLoading: combinedIsLoading,
    mutate,
  };
}