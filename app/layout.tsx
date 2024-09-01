import {
  ClerkProvider
} from '@clerk/nextjs';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModelProvider } from '@/components/model-provider';
import { ToasterProvider } from '@/components/toaster-provider';
import { CrispProvider } from '@/components/crisp-provider';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revolutionary",
  description: "AI Saas App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
        <ModelProvider />
        <ToasterProvider />
        {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
