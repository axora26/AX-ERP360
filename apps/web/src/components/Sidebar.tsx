"use client";
import Link from "next/link";

import { type IconName, Icon } from "./icons";
import {
  type NavigationItem,
  isNavigationItemActive,
  navigationItems,
} from "../navigation";

export interface SidebarProps {
  readonly pathname: string;
  readonly collapsed?: boolean;
  readonly items?: readonly NavigationItem[];
  readonly onNavigate?: () => void;
}

const ICON_BY_HREF: Readonly<Record<string, IconName>> = {
  "/operations": "operations",
  "/projects": "projects",
  "/commercial": "commercial",
  "/procurement": "procurement",
  "/finance": "finance",
  "/engineering": "engineering",
  "/quality": "quality",
  "/assets": "assets",
};

export function Sidebar({
  pathname,
  collapsed = false,
  items = navigationItems,
  onNavigate,
}: SidebarProps) {
  return (
    <nav
      aria-label="Navigation principale"
      className={collapsed ? "ax-sidebar ax-sidebar--collapsed" : "ax-sidebar"}
    >
      <div className="ax-sidebar__brand">
        <span className="ax-sidebar__mark" aria-hidden="true">
          AX
        </span>
        {!collapsed ? (
          <span className="ax-sidebar__product">
            <span className="ax-sidebar__product-name">AX-ERP360</span>
            <span className="ax-sidebar__product-tag">AXORA GROUP SARLU</span>
          </span>
        ) : null}
      </div>

      <ul className="ax-sidebar__list">
        {items.map((item) => {
          const active = isNavigationItemActive(pathname, item.href);
          const icon = ICON_BY_HREF[item.href] ?? "operations";
          return (
            <li key={item.href}>
              <Link
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "ax-sidebar__link ax-sidebar__link--active"
                    : "ax-sidebar__link"
                }
                href={item.href}
                title={collapsed ? item.label : undefined}
                onClick={() => onNavigate?.()}
              >
                <Icon name={icon} size={20} />
                {!collapsed ? (
                  <span className="ax-sidebar__link-label">{item.label}</span>
                ) : (
                  <span className="ax-visually-hidden">{item.label}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
