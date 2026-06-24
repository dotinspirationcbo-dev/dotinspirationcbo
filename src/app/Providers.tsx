import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Strip "KEY=value" format in case the secret was stored with the key name prepended
const _rawKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
const PUBLISHABLE_KEY = _rawKey?.includes("=")
  ? _rawKey.split("=").slice(1).join("=")
  : _rawKey;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable.");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Providers — sole location for all global context providers.
 * Order: ClerkProvider (auth) → QueryClientProvider (data) → BrowserRouter (routing) → app tree.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
