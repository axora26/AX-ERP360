import { describe, expect, it } from "vitest";

import { highlightMatch, search } from "./search";

describe("search", () => {
  it("returns nothing for an empty query", () => {
    expect(search("   ")).toEqual([]);
  });

  it("ranks a label prefix above a keyword match", () => {
    const results = search("projet");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.id).toBe("srv_projects");
  });

  it("is accent and case insensitive", () => {
    const lower = search("qualite");
    const accented = search("Qualité");
    expect(lower.map((r) => r.id)).toEqual(accented.map((r) => r.id));
    expect(accented.some((r) => r.id === "srv_quality")).toBe(true);
  });

  it("requires every term to match (AND semantics)", () => {
    expect(
      search("nouveau bon commande").some((r) => r.id === "srv_action_new_po"),
    ).toBe(true);
    expect(search("xyz improbable").length).toBe(0);
  });

  it("flags a label that contains the query", () => {
    expect(highlightMatch("Command Center", "command")).toBe(true);
    expect(highlightMatch("Finance", "command")).toBe(false);
  });
});
