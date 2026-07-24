import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Saman Shakil Khan — Full Stack Developer",
  description:
    "Portfolio of Saman Shakil Khan, a full stack developer based in Dubai, UAE.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
