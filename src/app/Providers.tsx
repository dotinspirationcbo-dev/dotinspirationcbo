import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

// Strip "KEY=value" format in case the secret was stored with the key name prepended
const _rawKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
const PUBLISHABLE_KEY = _rawKey?.includes("=")
  ? _rawKey.split("=").slice(1).join("=")
  : _rawKey;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable.");
}

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Providers — sole location for all global context providers.
 * Order: ClerkProvider (auth) → BrowserRouter (routing) → app tree.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>{children}</BrowserRouter>
    </ClerkProvider>
  );
}
