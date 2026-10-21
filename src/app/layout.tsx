import type { Metadata } from "next";
import { Red_Hat_Display, Red_Hat_Text } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LayoutWrapper } from "@/components/LayoutWrapper";

// Headings and body come from the Red Hat superfamily: open-source type from the Linux world.
const display = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-rh-display",
});

const text = Red_Hat_Text({
  subsets: ["latin"],
  variable: "--font-rh-text",
});

export const metadata: Metadata = {
  title: "Linux Adona | Full-stack web developer",
  description:
    "Linux Adona designs and builds websites and web apps for businesses, students and local government. Based in Balayan, Batangas, Philippines.",
  icons: {
    icon: { url: "/tab-logo.png", type: "image/png" },
    apple: "/tab-logo.png",
  },
};

// Applies the theme before first paint to avoid a flash of the wrong theme: the visitor's
// saved choice, otherwise their system setting (followed live until they pick one).
// Must stay a raw inline <script> in <head> so it runs during HTML parse — next/script
// with beforeInteractive defers inline code to the Next.js runtime, which paints first.
// React 19 strips <html>'s attributes when it hydrates it, so the script also watches the
// class and restores the theme in the same task (MutationObserver runs before paint).
function ThemeScript() {
  const script = `
    (function() {
      var root = document.documentElement;
      var system = window.matchMedia('(prefers-color-scheme: dark)');
      function stored() {
        try {
          var t = localStorage.getItem('portfolio-theme');
          return t === 'light' || t === 'dark' ? t : null;
        } catch (e) { return null; }
      }
      function preferred() { return stored() || (system.matches ? 'dark' : 'light'); }
      function applyTheme() {
        if (root.classList.contains('theme-dark') || root.classList.contains('theme-light')) return;
        root.classList.add('theme-' + preferred());
      }
      applyTheme();
      new MutationObserver(applyTheme).observe(root, { attributes: true, attributeFilter: ['class'] });
      system.addEventListener('change', function() {
        if (stored()) return;
        root.classList.remove('theme-dark', 'theme-light');
        applyTheme();
      });
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
      <body className={cn("min-h-screen", display.variable, text.variable)}>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
