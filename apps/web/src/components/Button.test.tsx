import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("uses safe native semantics and invokes its action", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Actualiser</Button>);

    const button = screen.getByRole("button", { name: "Actualiser" });
    expect(button).toHaveAttribute("type", "button");

    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("blocks interaction and announces busy state while loading", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button loading loadingLabel="Connexion" onClick={onClick}>
        Se connecter
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Connexion" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("stays disabled when explicitly disabled", () => {
    render(<Button disabled>Indisponible</Button>);
    expect(screen.getByRole("button", { name: "Indisponible" })).toBeDisabled();
  });
});
