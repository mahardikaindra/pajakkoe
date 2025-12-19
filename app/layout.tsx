import type { Metadata } from "next";
import { Geist, Geist_Mono, } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const digitaleRegular = localFont({
  src: './fonts/Digitale-Regular.otf',
  variable: '--font-digitale-regular',
  display: 'swap',
});

const digitaleBold = localFont({
  src: './fonts/Digitale-Bold.otf',
  variable: '--font-digitale-bold',
  display: 'swap',
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
      <body
        className={`${digitaleRegular.variable} ${digitaleBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
