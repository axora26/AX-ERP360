import { describe, expect, it } from "vitest";

import {
  getOrganization,
  isOrganizationId,
  organizations,
} from "./organizations";

describe("organizations", () => {
  it("validates known organization ids", () => {
    expect(isOrganizationId(organizations[0]!.id)).toBe(true);
    expect(isOrganizationId("org_unknown")).toBe(false);
  });

  it("resolves an organization by id", () => {
    const target = organizations[1]!;
    expect(getOrganization(target.id)?.name).toBe(target.name);
    expect(getOrganization("org_missing")).toBeUndefined();
  });
});
