import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { api } from "@/utils/api";
import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
      <Toaster />
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
