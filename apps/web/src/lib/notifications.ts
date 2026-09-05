export type NotificationPriority = "info" | "success" | "warning" | "danger";

export interface NotificationItem {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly time: string;
  readonly priority: NotificationPriority;
  readonly read: boolean;
  readonly href: string;
}

export const demoNotifications: readonly NotificationItem[] = [
  {
    id: "ntf_1",
    title: "Validation requise",
    body: "La soumission projet Atlas dépasse le seuil budgétaire.",
    time: "Il y a 6 min",
    priority: "warning",
    read: false,
    href: "/projects/atlas/review",
  },
  {
    id: "ntf_2",
    title: "Réception confirmée",
    body: "Bon de livraison BL-2041 enregistré à l'entrepôt central.",
    time: "Il y a 41 min",
    priority: "success",
    read: false,
    href: "/procurement/receptions/bl-2041",
  },
  {
    id: "ntf_3",
    title: "Anomalie qualité",
    body: "Non-conformité NC-118 ouverte sur le chantier Horizon.",
    time: "Il y a 2 h",
    priority: "danger",
    read: false,
    href: "/quality/nc/118",
  },
  {
    id: "ntf_4",
    title: "Point de situation",
    body: "Le rapport hebdomadaire opérations est disponible.",
    time: "Hier",
    priority: "info",
    read: true,
    href: "/operations/reports/weekly",
  },
] as const;

export function countUnread(items: readonly NotificationItem[]): number {
  return items.reduce((total, item) => (item.read ? total : total + 1), 0);
}

export function markAllRead(
  items: readonly NotificationItem[],
): NotificationItem[] {
  return items.map((item) => (item.read ? item : { ...item, read: true }));
}

export function priorityLabel(priority: NotificationPriority): string {
  switch (priority) {
    case "success":
      return "Réussite";
    case "warning":
      return "Attention";
    case "danger":
      return "Bloquant";
    case "info":
    default:
      return "Information";
  }
}
