/** @format */
"use client";

import { ThemeProvider } from "next-themes";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();
export default function LayoutContainer({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
