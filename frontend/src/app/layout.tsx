import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import theme from "@/theme";
import { ThemeProvider } from '@mui/material/styles';

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IA Image Analysis",
  description: "Upload an image and let AI identify its contents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserratSans.variable}`}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html >
  );
}
