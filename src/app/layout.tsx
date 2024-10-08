import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import CartProvider from "@/lib/cartContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ToastContainer />
          <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
            <Header />
            <main className="flex-grow container mx-auto p-4">{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
