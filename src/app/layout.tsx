import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationShell } from "@/components/layout/NavigationShell";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Triverge Healthcare",
  description: "Your One-Stop Elderly Care Provider",
  icons: {
    icon: "/triverge-favicon.png",
    apple: "/triverge-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          manrope.variable,
          newsreader.variable,
          "antialiased min-h-screen flex flex-col font-body bg-background transition-colors duration-300"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NavigationShell>
            {children}
          </NavigationShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
