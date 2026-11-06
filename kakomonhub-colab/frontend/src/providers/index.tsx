"use client";
import { FC } from "react";
import { AuthProvider } from "./AuthProvider";

// import { ErrorBoundaryProvider } from "./error-boundary-provider";
// import { NextAuthProvider } from "./next-auth-provider";
import { ReactQueryProvider } from "./react-query-provider";

type AppProvidersProps = {
  children: React.ReactNode;
};

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    // <ErrorBoundaryProvider>
    //   <NextAuthProvider>
    <AuthProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </AuthProvider>
    //   </NextAuthProvider>
    // </ErrorBoundaryProvider>
  );
};
