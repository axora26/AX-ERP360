import { describe, expect, it } from "vitest";
import { isNavigationItemActive } from "./navigation";

describe("isNavigationItemActive", () => {
  it("matches an exact workspace route", () => {
    expect(isNavigationItemActive("/operations", "/operations")).toBe(true);
  });

  it("matches a nested workspace route", () => {
    expect(isNavigationItemActive("/projects/alpha/costs", "/projects")).toBe(
      true,
    );
  });

  it("does not match a route with a shared prefix", () => {
    expect(isNavigationItemActive("/project-settings", "/projects")).toBe(
      false,
    );
  });
});
