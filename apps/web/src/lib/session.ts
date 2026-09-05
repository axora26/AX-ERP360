export interface SessionUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly initials: string;
}

export interface Session {
  readonly user: SessionUser;
  readonly organizationId: string;
  readonly isDemo: boolean;
}

/**
 * Demo session used by the local shell. Clearly flagged as demonstration data
 * so it is never mistaken for a production source.
 */
export const demoSession: Session = {
  user: {
    id: "usr_demo",
    name: "Aminata Diallo",
    email: "a.diallo@axora.group",
    role: "Responsable opérations",
    initials: "AD",
  },
  organizationId: "org_axora_construction",
  isDemo: true,
};
