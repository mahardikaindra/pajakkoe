// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { FirebaseProvider } from "../components/layout/FirebaseProvider";
import "./globals.css";

const digitaleRegular = localFont({
  src: "../fonts/Digitale-Regular.otf",
  variable: "--font-digitale-regular",
  display: "swap",
});

const digitaleBold = localFont({
  src: "../fonts/Digitale-Bold.otf",
  variable: "--font-digitale-bold",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pajak!Koe - Aplikasi Pengelolaan Pajak Online, Pembuatan NPWP",
  description:
    "Kelola pajak Anda dengan mudah menggunakan Pajak!Koe. Daftar NPWP online, hitung pajak, dan laporkan SPT tahunan tanpa ribet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="K4Ik57HKqzHs_0WWClwx1CvFKr9XqdVuPM5D9Ntufjo"
      />
      <body
        suppressHydrationWarning={true}
        className={`${digitaleRegular.variable} ${digitaleBold.variable} antialiased`}
      >
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
