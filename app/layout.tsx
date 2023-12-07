import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/modalProvider";
import { ToasterProvider } from "@/components/toasterProvider";
import { CrispChatProvider } from "@/components/crispChatProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genie",
  description: "AI utility tool based on generative AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispChatProvider />
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
