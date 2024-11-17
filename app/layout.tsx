import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import "./globals.css";
import { Toaster } from "./_components/ui/sonner";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "FinanceIQ",
  description: "Gerencie suas finanças com facilidade usando FinanceIQ",
  robots: "index, follow",
  openGraph: {
    title: "FinanceIQ - Gerencie suas finanças",
    description: "Plataforma para gerenciamento de finanças pessoais.",
    url: "https://www.financeiq.com",
    siteName: "FinanceIQ",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FinanceIQ - Gerencie suas finanças",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinanceIQ - Gerencie suas finanças",
    description: "A solução completa para o gerenciamento financeiro.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="pt-BR">
        <body className={`${mulish.className} dark antialiased`}>
          <ClerkLoading>
            <div className="flex h-screen items-center justify-center">
              <Image src="/logo.svg" alt="Logo" width={250} height={250} />
            </div>
          </ClerkLoading>

          <ClerkLoaded>
            <div className="flex h-full flex-col xl:overflow-hidden">
              {children}
            </div>
            <Toaster />
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
