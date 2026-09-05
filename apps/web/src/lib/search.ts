export type SearchResultType = "page" | "action" | "module" | "help";

export interface SearchResult {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly href: string;
  readonly type: SearchResultType;
  readonly keywords: readonly string[];
}

export const searchIndex: readonly SearchResult[] = [
  {
    id: "srv_operations",
    label: "Command Center",
    description: "Vue opérationnelle consolidée",
    href: "/operations",
    type: "page",
    keywords: ["operations", "command center", "tableau de bord", "accueil"],
  },
  {
    id: "srv_projects",
    label: "Projets",
    description: "Portefeuille et suivi de chantier",
    href: "/projects",
    type: "page",
    keywords: ["projets", "chantier", "portefeuille", "wbs"],
  },
  {
    id: "srv_commercial",
    label: "Commercial",
    description: "Devis, clients et pipeline",
    href: "/commercial",
    type: "page",
    keywords: ["commercial", "devis", "client", "opportunité", "crm"],
  },
  {
    id: "srv_procurement",
    label: "Achats",
    description: "Bons de commande et réceptions",
    href: "/procurement",
    type: "page",
    keywords: ["achats", "approvisionnement", "bon de commande", "réception"],
  },
  {
    id: "srv_finance",
    label: "Finance",
    description: "Factures, trésorerie et clôture",
    href: "/finance",
    type: "page",
    keywords: ["finance", "facture", "trésorerie", "comptabilité", "tva"],
  },
  {
    id: "srv_engineering",
    label: "Ingénierie",
    description: "BIM, plans et calculations",
    href: "/engineering",
    type: "page",
    keywords: ["ingénierie", "bim", "mep", "plans", "calcul"],
  },
  {
    id: "srv_quality",
    label: "QHSE",
    description: "Qualité, sécurité et conformité",
    href: "/quality",
    type: "page",
    keywords: ["qhse", "qualité", "sécurité", "nc", "audit"],
  },
  {
    id: "srv_assets",
    label: "Actifs",
    description: "Parc matériel et maintenance",
    href: "/assets",
    type: "page",
    keywords: ["actifs", "matériel", "equipement", "maintenance", "parc"],
  },
  {
    id: "srv_action_new_project",
    label: "Nouveau projet",
    description: "Créer un dossier de projet",
    href: "/projects/new",
    type: "action",
    keywords: ["nouveau", "créer", "projet", "ajouter"],
  },
  {
    id: "srv_action_new_po",
    label: "Nouveau bon de commande",
    description: "Saisir un achat",
    href: "/procurement/orders/new",
    type: "action",
    keywords: ["nouveau", "bon de commande", "achat", "saisir"],
  },
  {
    id: "srv_help_shortcuts",
    label: "Raccourcis clavier",
    description: "Aide des raccourcis",
    href: "/help/keyboard",
    type: "help",
    keywords: ["aide", "raccourcis", "clavier", "support"],
  },
] as const;

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

export function search(query: string): SearchResult[] {
  const trimmed = normalize(query);
  if (trimmed.length === 0) {
    return [];
  }

  const terms = trimmed.split(/\s+/).filter(Boolean);
  const scored: Array<{
    readonly result: SearchResult;
    readonly score: number;
  }> = [];

  for (const result of searchIndex) {
    const haystack = normalize(
      [result.label, result.description, ...result.keywords].join(" "),
    );
    let score = 0;
    let matchedAll = true;

    for (const term of terms) {
      if (haystack.includes(term)) {
        if (normalize(result.label).startsWith(term)) {
          score += 5;
        } else if (normalize(result.label).includes(term)) {
          score += 3;
        } else {
          score += 1;
        }
      } else {
        matchedAll = false;
      }
    }

    if (matchedAll && score > 0) {
      scored.push({ result, score });
    }
  }

  return scored.sort((a, b) => b.score - a.score).map((entry) => entry.result);
}

export function highlightMatch(label: string, query: string): boolean {
  const normalizedLabel = normalize(label);
  const normalizedQuery = normalize(query);
  return (
    normalizedQuery.length > 0 && normalizedLabel.includes(normalizedQuery)
  );
}
