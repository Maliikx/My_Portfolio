import { Geist, Geist_Mono , Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";
import {ReactLenis} from '@/util/lenis.js'
import { Analytics } from '@vercel/analytics/next';
import TopInfo from "@/sections/components/TopInfo";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif', // This creates a CSS variable
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Maliikx.devs",
  description: "I'm a dedicated <mark>software engineer</mark> specializing in front-end engineering, adept at shaping compelling digital experiences for <mark>web and mobile</mark> platforms. that captivate audiences and elevate brands. Driven by a passion for innovation and constantly weaving my passion into life's tapestry",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/mask.svg" type="image/x-icon" />

      <ReactLenis root>
        <body
          className={`${inter.variable} ${inter.className} antialiased`}
        >
          {children}
          <Analytics />


        </body>
      </ReactLenis>
    </html>
  );
}
