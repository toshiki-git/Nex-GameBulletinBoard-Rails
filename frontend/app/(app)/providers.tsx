"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/app/components/Header/Header";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <NextUIProvider>
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <div className="flex">
        <Header />
        <main className="w-full max-w-[45rem] mx-auto my-2">{children}</main>
      </div>
    </NextThemesProvider>
  </NextUIProvider>
);

export default Providers;
