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
  title: "Fintrack.AI",
  description: "Gerencie suas finanças com facilidade usando Fintrack.AI",
  robots: "index, follow",
  openGraph: {
    title: "Fintrack.AI - Gerencie suas finanças",
    description: "Plataforma para gerenciamento de finanças pessoais.",
    url: "https://www.Fintrack.AI.com",
    siteName: "Fintrack.AI",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
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
            <div className="flex h-screen items-center justify-center gap-4">
              <Image
                src="/logo-branco.svg"
                alt="Logo Fintrack.AI"
                width={30}
                height={30}
                className="animate-pulse"
              />
              <Image
                src="/logotipo-branco.svg"
                alt="Logo Fintrack.AI"
                width={250}
                height={250}
                className="animate-pulse"
              />
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
