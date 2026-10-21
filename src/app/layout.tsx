import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Mono, VT323 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LayoutWrapper } from "@/components/LayoutWrapper";

// Body face. adjustFontFallback is off so glyphs the web font lacks (box drawing in
// `tree` output) fall through to a system monospace face instead of a metric-matched Arial.
const atkinsonMono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin"],
  variable: "--font-atkinson-mono",
  adjustFontFallback: false,
});

// Display face, used only for the name: a DEC terminal bitmap font, like a TTY at full size.
const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "Profile | Linux Adona",
  description: "Personal portfolio showcasing projects, skills, and services",
  icons: {
    icon: "/favicon.svg",
  },
};

// Applies the stored theme before first paint to avoid a flash of the wrong theme.
// Must stay a raw inline <script> in <head> so it runs during HTML parse — next/script
// with beforeInteractive defers inline code to the Next.js runtime, which paints first.
// React 19 strips <html>'s attributes when it hydrates it, so the script also watches the
// class and restores the theme in the same task (MutationObserver runs before paint).
function ThemeScript() {
  const script = `
    (function() {
      var root = document.documentElement;
      function applyStoredTheme() {
        if (root.classList.contains('theme-dark') || root.classList.contains('theme-light')) return;
        var theme = 'dark';
        try { if (localStorage.getItem('portfolio-theme') === 'light') theme = 'light'; } catch (e) {}
        root.classList.add('theme-' + theme);
      }
      applyStoredTheme();
      new MutationObserver(applyStoredTheme).observe(root, { attributes: true, attributeFilter: ['class'] });
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
    // <html> carries no className so hydration leaves the theme class from ThemeScript alone.
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={cn("min-h-screen antialiased", atkinsonMono.variable, vt323.variable)}>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
