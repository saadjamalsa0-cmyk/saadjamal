import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import { notFound as nf } from "@/content/site";
import { arabicFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 | سعد جمال للمقاولات — Saad Jamal Contracting",
  robots: { index: false, follow: false },
};

/** Shown for any URL that doesn't exist. Bilingual because the language can't be known from a missing URL. */
export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={arabicFont.variable}>
      <body>
        <main className="relative flex min-h-screen items-center justify-center bg-stone-50 px-6 py-20 text-center">
          <div className="max-w-xl">
            <Image src="/images/logo.png" alt="" width={96} height={96} className="mx-auto h-24 w-24 object-contain" />
            <p className="mt-8 text-7xl font-extrabold text-crimson-700" dir="ltr">
              404
            </p>
            <h1 className="mt-4 text-3xl font-bold">{nf.title.ar}</h1>
            <p className="mt-3 text-ink-600">{nf.text.ar}</p>
            <p className="mt-6 text-xl font-bold text-ink-950" dir="ltr" lang="en">
              {nf.title.en}
            </p>
            <p className="mt-2 text-ink-600" dir="ltr" lang="en">
              {nf.text.en}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="/" className="btn btn-primary">
                {nf.back.ar}
              </a>
              <a href="/en/" className="btn btn-outline" lang="en">
                {nf.back.en}
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
