import type { Metadata } from "next";
import NotFoundBody from "@/components/not-found-body";
import "./globals.css";
import "../styles/fonts.css";

export const metadata: Metadata = { title: "الصفحة غير موجودة | Page Not Found" };

export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <main>
          <NotFoundBody />
        </main>
      </body>
    </html>
  );
}
