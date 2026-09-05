export interface NavigationItem {
  readonly href: string;
  readonly label: string;
  readonly shortLabel: string;
}

export const navigationItems: readonly NavigationItem[] = [
  { href: "/operations", label: "Command Center", shortLabel: "CC" },
  { href: "/projects", label: "Projets", shortLabel: "PJ" },
  { href: "/commercial", label: "Commercial", shortLabel: "CO" },
  { href: "/procurement", label: "Achats", shortLabel: "AC" },
  { href: "/finance", label: "Finance", shortLabel: "FI" },
  { href: "/engineering", label: "Ingénierie", shortLabel: "IN" },
  { href: "/quality", label: "QHSE", shortLabel: "QH" },
  { href: "/assets", label: "Actifs", shortLabel: "AT" },
] as const;

/**
 * True when `pathname` is the navigation base route or a nested route beneath
 * it. A shared prefix that is not a path segment boundary does not match
 * (e.g. "/project-settings" is not active for "/projects").
 */
export function isNavigationItemActive(
  pathname: string,
  baseHref: string,
): boolean {
  const base = baseHref.replace(/\/+$/, "");

  if (pathname === base) {
    return true;
  }

  return pathname.startsWith(`${base}/`);
}
