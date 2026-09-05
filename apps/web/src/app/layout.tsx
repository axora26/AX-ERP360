import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
export const metadata: Metadata = {
  title: "AX-ERP360 | AXORA GROUP SARLU",
  description:
    "Nouvelle interface AX-ERP360. Démonstration explicitement séparée des données de production.",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
