import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "@/context/language-context";

export const metadata = {
  title: "Todo App",
  description: "Advanced Todo Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
          >
            <Toaster position="top-right" />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
