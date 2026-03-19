export const metadata = {
  title: "AI GTM Engine",
  description: "Mini AI GTM Demo",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#0F0F1A",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
