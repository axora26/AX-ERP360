import { describe, expect, it } from "vitest";

import { isValidLogin, validateLogin } from "./login";

describe("validateLogin", () => {
  it("reports a missing email", () => {
    const errors = validateLogin({ email: "  ", password: "secret123" });
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeUndefined();
  });

  it("reports a malformed email", () => {
    const errors = validateLogin({
      email: "not-an-email",
      password: "secret123",
    });
    expect(errors.email).toMatch(/valide/);
  });

  it("reports a password that is too short", () => {
    const errors = validateLogin({
      email: "a.diallo@axora.group",
      password: "short",
    });
    expect(errors.password).toMatch(/8 caractères/);
  });

  it("accepts valid credentials after trimming surrounding space", () => {
    expect(
      isValidLogin({
        email: "  a.diallo@axora.group  ",
        password: "secret123",
      }),
    ).toBe(true);
  });

  it("reports every invalid field at once", () => {
    const errors = validateLogin({ email: "", password: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "password"]);
  });
});
