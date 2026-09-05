import { describe, expect, it } from "vitest";
import {
  csvCell,
  demoProjects,
  exportCsv,
  filterProjects,
  money,
  summarize,
} from "./demo-data";
describe("Synthetic project data", () => {
  it("aggregates integer cents deterministically", () => {
    expect(summarize(demoProjects)).toEqual({
      count: 5,
      active: 4,
      attention: 2,
      budgetCents: 435000000,
      committedCents: 281500000,
    });
  });
  it("returns empty aggregates without inventing data", () => {
    expect(summarize([])).toEqual({
      count: 0,
      active: 0,
      attention: 0,
      budgetCents: 0,
      committedCents: 0,
    });
  });
  it("supports accent-insensitive multi-term search", () => {
    expect(
      filterProjects(demoProjects, "equinoxe climatisation").map((p) => p.id),
    ).toEqual(["DEMO-005"]);
  });
  it("combines status and search filters", () => {
    expect(filterProjects(demoProjects, "", "attention")).toHaveLength(2);
    expect(filterProjects(demoProjects, "Horizon", "attention")).toHaveLength(
      0,
    );
  });
  it("rejects invalid and overflowing monetary values", () => {
    for (const budgetCents of [NaN, Infinity, -1, 0.1])
      expect(() => summarize([{ ...demoProjects[0]!, budgetCents }])).toThrow();
    expect(() =>
      summarize([
        { ...demoProjects[0]!, budgetCents: Number.MAX_SAFE_INTEGER },
        demoProjects[1]!,
      ]),
    ).toThrow();
  });
  it("requires integer cents when formatting", () => {
    expect(() => money(0.1)).toThrow();
    expect(money(100)).toContain("1");
  });
  it("neutralizes spreadsheet formulas and escapes embedded quotes", () => {
    expect(csvCell('=HYPERLINK("x")')).toBe('"\'=HYPERLINK(""x"")"');
    expect(csvCell(" @SUM(1)")).toBe('"\' @SUM(1)"');
    expect(csvCell('a"b')).toBe('"a""b"');
  });
  it("marks every export as demonstration data and respects selected rows", () => {
    const csv = exportCsv([demoProjects[0]!]);
    expect(csv).toContain("DONNEES FICTIVES");
    expect(csv).toContain("DEMO-001");
    expect(csv).not.toContain("DEMO-002");
    expect(csv).toContain("1840000.00");
  });
  it("does not mutate the supplied fixtures", () => {
    expect(Object.isFrozen(demoProjects)).toBe(true);
    expect(Object.isFrozen(demoProjects[0])).toBe(true);
  });
});
