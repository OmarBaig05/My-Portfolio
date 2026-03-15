import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | ML Engineer & Full-Stack Developer",
  description: "Professional portfolio showcasing machine learning, AI research, and full-stack development projects.",
  keywords: ["portfolio", "developer", "ML engineer", "AI researcher", "full-stack"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
