"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Icon } from "./icons";
import {
  type Organization,
  getOrganization,
  isOrganizationId,
  organizations,
} from "../lib/organizations";

export interface OrganizationSwitcherProps {
  readonly currentId: string;
  readonly onSelect?: (organization: Organization) => void;
}

export function OrganizationSwitcher({
  currentId,
  onSelect,
}: OrganizationSwitcherProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const current = getOrganization(currentId);

  useEffect(() => {
    if (!open) return;
    function handlePointer(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointer);
    return () => document.removeEventListener("mousedown", handlePointer);
  }, [open]);

  function select(organization: Organization) {
    setOpen(false);
    if (organization.id !== currentId) {
      onSelect?.(organization);
    }
  }

  return (
    <div className="ax-orgswitcher" ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="ax-orgswitcher__trigger"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="building" size={18} />
        <span className="ax-orgswitcher__name">
          {current?.name ?? "Sélectionner une société"}
        </span>
        <Icon name="chevronDown" size={16} />
      </button>

      {open ? (
        <ul className="ax-orgswitcher__menu" id={listId} role="listbox">
          {organizations.map((organization) => (
            <li key={organization.id}>
              <button
                aria-selected={organization.id === currentId}
                className="ax-orgswitcher__option"
                role="option"
                type="button"
                onClick={() => select(organization)}
              >
                <span className="ax-orgswitcher__option-name">
                  {organization.name}
                </span>
                <span className="ax-orgswitcher__option-role">
                  {organization.role}
                </span>
                {organization.id === currentId ? (
                  <Icon aria-hidden="true" name="check" size={16} />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export { isOrganizationId };
