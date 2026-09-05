import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Surface } from "./Surface";

describe("Surface", () => {
  it("supports a labelled semantic region without imposing card markup", () => {
    render(
      <Surface as="section" aria-label="Décisions à traiter">
        <p>Aucune décision bloquante.</p>
      </Surface>,
    );

    expect(
      screen.getByRole("region", { name: "Décisions à traiter" }),
    ).toHaveTextContent("Aucune décision bloquante.");
  });
});
