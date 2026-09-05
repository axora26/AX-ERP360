import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "./LoginForm";
function submit() {
  fireEvent.change(screen.getByLabelText(/e-mail/i), {
    target: { value: "demo@example.invalid" },
  });
  fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
    target: { value: "synthetic-test-only" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));
}
describe("LoginForm fail-closed contract", () => {
  it("does not collect credentials without a server adapter", () => {
    const onSuccess = vi.fn();
    render(<LoginForm onSuccess={onSuccess} />);
    expect(
      screen.getByRole("button", { name: "Connexion indisponible" }),
    ).toBeDisabled();
    expect(screen.queryByLabelText(/Mot de passe/i)).not.toBeInTheDocument();
    expect(onSuccess).not.toHaveBeenCalled();
  });
  it("validates fields before calling an adapter", () => {
    const authenticate = vi.fn();
    render(<LoginForm onAuthenticate={authenticate} />);
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));
    expect(screen.getByText(/e-mail est requise/)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(authenticate).not.toHaveBeenCalled();
  });
  it("reports success only after an accepted response, without passing a password to onSuccess", async () => {
    const authenticate = vi.fn().mockResolvedValue({ authenticated: true });
    const onSuccess = vi.fn();
    render(<LoginForm onAuthenticate={authenticate} onSuccess={onSuccess} />);
    submit();
    await waitFor(() => expect(onSuccess).toHaveBeenCalledExactlyOnceWith());
    expect(authenticate).toHaveBeenCalledWith({
      email: "demo@example.invalid",
      password: "synthetic-test-only",
    });
    expect(screen.getByLabelText(/Mot de passe/i)).toHaveValue("");
  });
  it("does not accept a rejected response", async () => {
    const onSuccess = vi.fn();
    render(
      <LoginForm
        onAuthenticate={vi.fn().mockResolvedValue({ authenticated: false })}
        onSuccess={onSuccess}
      />,
    );
    submit();
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Connexion impossible",
    );
    expect(onSuccess).not.toHaveBeenCalled();
  });
  it("handles adapter failures without displaying internal error details", async () => {
    const onSuccess = vi.fn();
    render(
      <LoginForm
        onAuthenticate={vi
          .fn()
          .mockRejectedValue(new Error("PRIVATE_INTERNAL_DETAIL"))}
        onSuccess={onSuccess}
      />,
    );
    submit();
    expect(await screen.findByRole("alert")).not.toHaveTextContent(
      "PRIVATE_INTERNAL_DETAIL",
    );
    expect(onSuccess).not.toHaveBeenCalled();
  });
  it("disables repeat submission while authentication is pending", async () => {
    let resolve!: (value: { authenticated: boolean }) => void;
    const authenticate = vi.fn(
      () =>
        new Promise<{ authenticated: boolean }>((r) => {
          resolve = r;
        }),
    );
    render(<LoginForm onAuthenticate={authenticate} />);
    submit();
    expect(
      screen.getByRole("button", { name: "Vérification en cours" }),
    ).toBeDisabled();
    fireEvent.click(
      screen.getByRole("button", { name: "Vérification en cours" }),
    );
    expect(authenticate).toHaveBeenCalledTimes(1);
    resolve({ authenticated: false });
    await screen.findByRole("alert");
  });
});
