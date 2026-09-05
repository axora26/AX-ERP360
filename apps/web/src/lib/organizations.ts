export interface Organization {
  readonly id: string;
  readonly name: string;
  readonly legalForm: string;
  readonly role: string;
}

export const organizations: readonly Organization[] = [
  {
    id: "org_axora_construction",
    name: "AXORA Construction SARLU",
    legalForm: "SARLU",
    role: "Administrateur",
  },
  {
    id: "org_axora_energie",
    name: "AXORA Énergie",
    legalForm: "SA",
    role: "Contrôleur",
  },
  {
    id: "org_axora_mep",
    name: "AXORA MEP & Building",
    legalForm: "SARLU",
    role: "Chef de projet",
  },
] as const;

export function isOrganizationId(value: string): boolean {
  return organizations.some((organization) => organization.id === value);
}

export function getOrganization(id: string): Organization | undefined {
  return organizations.find((organization) => organization.id === id);
}
