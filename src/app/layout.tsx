import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import AnimationReset from "@/components/AnimationReset";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profile | Linux Adona",
  description: "Personal portfolio showcasing projects, skills, and services",
  icons: {
    icon: "/favicon.svg",
  },
};

function ThemeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('portfolio-theme') || 'dark';
        document.documentElement.classList.remove('theme-dark', 'theme-light');
        document.documentElement.classList.add('theme-' + theme);
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export const viewport = {
  key: "viewport",
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={cn(
        "min-h-screen",
        "antialiased",
        figtree.variable,
        geistSans.variable,
        geistMono.variable,
        "font-sans"
      )}>
        <ThemeProvider>
          <AnimationReset>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AnimationReset>
        </ThemeProvider>
      </body>
    </html>
  );
}
