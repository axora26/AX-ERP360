import { describe, expect, it } from "vitest";

import {
  countUnread,
  demoNotifications,
  markAllRead,
  priorityLabel,
} from "./notifications";

describe("notifications", () => {
  it("counts only unread items", () => {
    expect(countUnread(demoNotifications)).toBe(3);
    expect(countUnread(markAllRead(demoNotifications))).toBe(0);
  });

  it("marks every item read without mutating the source", () => {
    const original = demoNotifications[0];
    if (!original) throw new Error("Missing notification fixture");
    const marked = markAllRead(demoNotifications);
    expect(original.read).toBe(false);
    expect(marked.every((item) => item.read)).toBe(true);
  });

  it("labels priorities in French", () => {
    expect(priorityLabel("danger")).toBe("Bloquant");
    expect(priorityLabel("success")).toBe("Réussite");
    expect(priorityLabel("info")).toBe("Information");
  });
});
