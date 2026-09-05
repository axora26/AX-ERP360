import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
const widths = [360, 390, 430, 768, 1024, 1280, 1440, 1920];
for (const width of widths) {
  test(`responsive viewport ${width}px has no horizontal overflow or script errors`, async ({
    page,
  }, info) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto("/operations");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Centre de pilotage", exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: info.outputPath("viewport.png"),
      fullPage: true,
    });
  });
}
test("filters projects and exports only matching synthetic rows", async ({
  page,
}) => {
  await page.goto("/projects");
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Filtrer les projets").fill("equinoxe");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exporter la démo" }).click();
  const download = await downloadPromise;
  const path = await download.path();
  expect(path).toBeTruthy();
  const csv = await readFile(path!, "utf8");
  expect(csv).toContain("DONNEES FICTIVES");
  expect(csv).toContain("DEMO-005");
  expect(csv).not.toContain("DEMO-001");
  await page.getByLabel("Statut du projet").selectOption("completed");
  await expect(
    page.getByRole("heading", { name: "Aucun projet à afficher" }),
  ).toBeVisible();
});
test("search, project details and Escape work without a backend", async ({
  page,
}) => {
  await page.goto("/operations");
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Projet, référence ou module").fill("Atlas");
  await dialog.getByRole("button", { name: /Tour Atlas/ }).click();
  await expect(
    dialog.getByRole("heading", { name: "Tour Atlas" }),
  ).toBeVisible();
  await expect(dialog.getByText(/PROJET FICTIF/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});
test("empty, loading and error simulations are explicit and reversible", async ({
  page,
}) => {
  await page.goto("/operations");
  await page.waitForLoadState("networkidle");
  await page.getByLabel("État de l’interface").selectOption("empty");
  await expect(
    page.getByRole("heading", { name: "Aucun projet à afficher" }),
  ).toBeVisible();
  await page.getByLabel("État de l’interface").selectOption("loading");
  await expect(
    page.getByRole("heading", { name: "Simulation : chargement des données" }),
  ).toBeVisible();
  await page.getByLabel("État de l’interface").selectOption("error");
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "Simulation : source indisponible",
  );
  await page
    .getByRole("button", { name: "Revenir à la démonstration" })
    .click();
  await expect(page.locator("tbody tr")).toHaveCount(5);
});
test("login never simulates authentication or collects production credentials", async ({
  page,
}) => {
  await page.goto("/login");
  await expect(
    page.getByRole("button", { name: "Connexion indisponible" }),
  ).toBeDisabled();
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await page.getByRole("link", { name: "Explorer la démonstration" }).click();
  await expect(page).toHaveURL(/\/operations$/);
});
test("mobile navigation opens, closes and reaches the finance screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/operations");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Ouvrir la navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Finance", exact: true })
    .click();
  await expect(page).toHaveURL(/\/finance$/);
  await expect(
    page.getByRole("heading", { name: "Situation budgétaire" }),
  ).toBeVisible();
});
test("all advertised module routes render and unknown routes return 404", async ({
  page,
}) => {
  for (const section of [
    "operations",
    "projects",
    "commercial",
    "procurement",
    "finance",
    "engineering",
    "quality",
    "assets",
  ]) {
    const response = await page.goto(`/${section}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    if (!["operations", "projects", "finance"].includes(section))
      await expect(page.getByText("À VENIR · NON IMPLÉMENTÉ")).toBeVisible();
  }
  const response = await page.goto("/unknown-module");
  expect(response?.status()).toBe(404);
});
for (const dark of [false, true]) {
  test(`automated accessibility scan ${dark ? "dark mobile" : "light desktop"}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({
      width: dark ? 390 : 1440,
      height: dark ? 844 : 1000,
    });
    await page.goto("/operations");
    await page.waitForLoadState("networkidle");
    if (dark) {
      await page.getByRole("button", { name: "Mode sombre" }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.screenshot({
      path: info.outputPath("accessibility.png"),
      fullPage: true,
    });
  });
}
