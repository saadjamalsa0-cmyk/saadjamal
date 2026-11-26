import { HomePage, homeMetadata } from "@/components/pages";

export const metadata = homeMetadata("ar");

export default function Page() {
  return <HomePage locale="ar" />;
}
