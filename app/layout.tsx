import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/providers/ThemeProvider";
import QueryProvider from "@/providers/QueryProvider";
import Web3Provider from "@/providers/ThirdWebProvider";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uncut - Téléchargement de films",
  description:
    "Inscrivez-vous et rejoignez la communauté Uncut pour profiter de milliers de films !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <QueryProvider>
            <AuthProvider>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <div className="flex flex-col justify-between min-h-screen">
                  <Navbar />
                  <div className="flex-grow">{children}</div>
                  <Footer />
                </div>
              </ThemeProvider>
            </AuthProvider>
          </QueryProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
