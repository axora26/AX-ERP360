import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Sidebar } from "./Sidebar";
import { navigationItems } from "../navigation";

describe("Sidebar", () => {
  it("marks the link matching the current path as active", () => {
    render(<Sidebar pathname="/projects" />);

    const activeLink = screen.getByRole("link", { name: /Projets/ });
    expect(activeLink).toHaveAttribute("aria-current", "page");

    const otherLink = screen.getByRole("link", { name: /Finance/ });
    expect(otherLink).not.toHaveAttribute("aria-current");
  });

  it("does not activate a shared-prefix route", () => {
    render(<Sidebar pathname="/project-settings" />);
    expect(screen.queryByRole("link", { current: "page" })).toBeNull();
  });

  it("renders every navigation item", () => {
    render(<Sidebar pathname="/" />);
    for (const item of navigationItems) {
      expect(
        screen.getByRole("link", { name: item.label }),
      ).toBeInTheDocument();
    }
  });

  it("hides labels when collapsed but keeps them for assistive tech", () => {
    render(<Sidebar pathname="/" collapsed />);
    const link = screen.getByRole("link", { name: "Command Center" });
    expect(link).toBeInTheDocument();
    expect(link.querySelector(".ax-sidebar__link-label")).toBeNull();
  });
});
