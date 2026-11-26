import { AboutPage, aboutMetadata } from "@/components/pages";

export const metadata = aboutMetadata("en");

export default function Page() {
  return <AboutPage locale="en" />;
}
