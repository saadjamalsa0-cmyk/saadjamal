import type { ReactNode } from "react";
import { baseMetadata, RootShell, viewport } from "@/components/root-layout";

export const metadata = baseMetadata("ar");
export { viewport };

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="ar">{children}</RootShell>;
}
