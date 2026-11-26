import Image from "next/image";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";

/** Bilingual: the language can't be known from a missing URL. */
export default function NotFoundBody() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-6 py-20 text-center">
      <div className="max-w-xl">
        <Image src="/images/logo.png" alt="" width={96} height={96} className="mx-auto h-24 w-24 object-contain" />
        <p className="mt-8 text-7xl font-extrabold text-crimson-700" dir="ltr">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold">{ar.notFound.title}</h1>
        <p className="mt-3 text-ink-600">{ar.notFound.text}</p>
        <p className="mt-6 text-xl font-bold text-ink-950" dir="ltr" lang="en">
          {en.notFound.title}
        </p>
        <p className="mt-2 text-ink-600" dir="ltr" lang="en">
          {en.notFound.text}
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a href="/" className="btn btn-primary">
            {ar.notFound.back}
          </a>
          <a href="/en" className="btn btn-outline" lang="en">
            {en.notFound.back}
          </a>
        </div>
      </div>
    </div>
  );
}
