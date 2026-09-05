import { describe, expect, it } from "vitest";

import { matchShortcut } from "./shortcuts";

describe("matchShortcut", () => {
  it("maps Ctrl+K to the global search action", () => {
    expect(matchShortcut({ key: "k", ctrlKey: true, metaKey: false })).toBe(
      "openSearch",
    );
  });

  it("maps Ctrl+B to the sidebar toggle", () => {
    expect(matchShortcut({ key: "b", ctrlKey: true, metaKey: false })).toBe(
      "toggleSidebar",
    );
  });

  it("maps the bare question mark to help", () => {
    expect(matchShortcut({ key: "?", ctrlKey: false, metaKey: false })).toBe(
      "openHelp",
    );
  });

  it("ignores plain modifier presses and unknown combos", () => {
    expect(
      matchShortcut({ key: "Control", ctrlKey: true, metaKey: false }),
    ).toBeUndefined();
    expect(
      matchShortcut({ key: "z", ctrlKey: false, metaKey: false }),
    ).toBeUndefined();
  });

  it("accepts meta as an alternative to ctrl on macOS", () => {
    expect(matchShortcut({ key: "K", ctrlKey: false, metaKey: true })).toBe(
      "openSearch",
    );
  });
});
