export type ProjectStatus = "active" | "attention" | "completed";
export interface DemoProject {
  readonly id: string;
  readonly name: string;
  readonly discipline: string;
  readonly phase: string;
  readonly status: ProjectStatus;
  readonly progress: number;
  readonly budgetCents: number;
  readonly committedCents: number;
}
// Entirely synthetic fixtures. Never import this module into production accounting.
export const demoProjects: readonly DemoProject[] = Object.freeze(
  [
    {
      id: "DEMO-001",
      name: "Campus Horizon",
      discipline: "Construction",
      phase: "Gros œuvre",
      status: "active",
      progress: 68,
      budgetCents: 184000000,
      committedCents: 112000000,
    },
    {
      id: "DEMO-002",
      name: "Tour Atlas",
      discipline: "Ingénierie technique",
      phase: "Études techniques",
      status: "attention",
      progress: 42,
      budgetCents: 92000000,
      committedCents: 68000000,
    },
    {
      id: "DEMO-003",
      name: "Hub Logistique",
      discipline: "Électricité",
      phase: "Installation",
      status: "active",
      progress: 81,
      budgetCents: 67000000,
      committedCents: 48000000,
    },
    {
      id: "DEMO-004",
      name: "Résidence Nova",
      discipline: "Bâtiment intelligent",
      phase: "Mise en service",
      status: "completed",
      progress: 100,
      budgetCents: 38000000,
      committedCents: 34500000,
    },
    {
      id: "DEMO-005",
      name: "Centre Équinoxe",
      discipline: "Climatisation",
      phase: "Approvisionnement",
      status: "attention",
      progress: 27,
      budgetCents: 54000000,
      committedCents: 19000000,
    },
  ].map((p) => Object.freeze(p)) as DemoProject[],
);
export const statusLabels: Readonly<Record<ProjectStatus, string>> = {
  active: "En cours",
  attention: "À surveiller",
  completed: "Terminé",
};
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
export function filterProjects(
  items: readonly DemoProject[],
  query: string,
  status: string = "all",
): readonly DemoProject[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return items.filter(
    (p) =>
      (status === "all" || p.status === status) &&
      terms.every((term) =>
        normalize(`${p.id} ${p.name} ${p.discipline}`).includes(term),
      ),
  );
}
export function summarize(items: readonly DemoProject[]) {
  return items.reduce(
    (sum, p) => {
      for (const amount of [p.budgetCents, p.committedCents])
        if (!Number.isSafeInteger(amount) || amount < 0)
          throw new RangeError("Expected non-negative safe integer cents");
      const budgetCents = sum.budgetCents + p.budgetCents,
        committedCents = sum.committedCents + p.committedCents;
      if (
        !Number.isSafeInteger(budgetCents) ||
        !Number.isSafeInteger(committedCents)
      )
        throw new RangeError("Aggregate exceeds safe integer range");
      return {
        count: sum.count + 1,
        active: sum.active + Number(p.status !== "completed"),
        attention: sum.attention + Number(p.status === "attention"),
        budgetCents,
        committedCents,
      };
    },
    { count: 0, active: 0, attention: 0, budgetCents: 0, committedCents: 0 },
  );
}
export function money(cents: number): string {
  if (!Number.isSafeInteger(cents))
    throw new RangeError("Expected integer cents");
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
export function csvCell(value: string | number): string {
  let text = String(value);
  if (/^[\s]*[=+@-]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}
export function exportCsv(items: readonly DemoProject[]): string {
  const rows = [
    ["DEMONSTRATION - DONNEES FICTIVES - AUCUNE VALEUR COMPTABLE"],
    ["Reference", "Projet", "Statut", "Budget USD", "Engage USD"],
    ...items.map((p) => [
      p.id,
      p.name,
      statusLabels[p.status],
      (p.budgetCents / 100).toFixed(2),
      (p.committedCents / 100).toFixed(2),
    ]),
  ];
  return (
    "\ufeff" +
    rows.map((row) => row.map(csvCell).join(";")).join("\r\n") +
    "\r\n"
  );
}
