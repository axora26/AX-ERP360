import { notFound } from "next/navigation";
import { navigationItems } from "../../navigation";
import { Workspace } from "../../components/Workspace";
export function generateStaticParams() {
  return navigationItems.map((item) => ({ section: item.href.slice(1) }));
}
export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!navigationItems.some((item) => item.href === `/${section}`)) notFound();
  return <Workspace section={section} />;
}
