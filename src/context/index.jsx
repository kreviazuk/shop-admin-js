import React from "react";
import { AuthProvider } from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

export default function AppProviders({ children }){
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      < BrowserRouter>
        <AuthProvider >
          {children}
        </AuthProvider>
        </BrowserRouter>
    </QueryClientProvider>
  );
};