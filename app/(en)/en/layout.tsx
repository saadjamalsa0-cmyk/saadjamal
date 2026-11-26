import type { ReactNode } from "react";
import { baseMetadata, RootShell, viewport } from "@/components/root-layout";

export const metadata = baseMetadata("en");
export { viewport };

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
