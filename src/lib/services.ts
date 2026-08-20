import { serviceSlugs } from "@/data/services/registry";

export function isServicePage(pathname: string) {
  const slug = pathname.replace(/^\//, "");
  return serviceSlugs.includes(slug);
}

export function serviceHref(slug: string) {
  return `/${slug}`;
}
