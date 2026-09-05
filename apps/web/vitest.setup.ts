import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
// Vitest globals are disabled: register DOM cleanup explicitly for test isolation.
afterEach(() => cleanup());
