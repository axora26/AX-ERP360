"use client";
import { useId, useState, type FormEvent } from "react";
import { Button } from "./Button";
import {
  validateLogin,
  type LoginCredentials,
  type LoginErrors,
} from "../lib/login";
export interface LoginFormProps {
  readonly onAuthenticate?: (
    credentials: LoginCredentials,
  ) => Promise<{ authenticated: boolean }>;
  readonly onSuccess?: () => void;
  readonly defaultEmail?: string;
}
/** No simulated login. A successful response must come from an explicit adapter. */
export function LoginForm({
  onAuthenticate,
  onSuccess,
  defaultEmail = "",
}: LoginFormProps) {
  const [email, setEmail] = useState(defaultEmail),
    [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({}),
    [loading, setLoading] = useState(false),
    [failure, setFailure] = useState("");
  const emailId = useId(),
    passwordId = useId(),
    noticeId = useId();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!onAuthenticate || loading) return;
    const credentials = { email: email.trim(), password };
    const nextErrors = validateLogin(credentials);
    setErrors(nextErrors);
    setFailure("");
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    let accepted = false;
    try {
      const result = await onAuthenticate(credentials);
      if (result.authenticated !== true)
        throw new Error("Authentication rejected");
      accepted = true;
      setPassword("");
    } catch {
      setFailure(
        "Connexion impossible. Vérifiez vos accès ou réessayez plus tard.",
      );
    } finally {
      setLoading(false);
    }
    if (accepted) onSuccess?.();
  }
  if (!onAuthenticate)
    return (
      <div className="ax-login-form">
        <p id={noticeId}>
          Authentification serveur non configurée. Ne saisissez aucun
          identifiant réel dans cette démonstration.
        </p>
        <Button disabled aria-describedby={noticeId}>
          Connexion indisponible
        </Button>
      </div>
    );
  return (
    <form className="ax-login-form" noValidate onSubmit={handleSubmit}>
      <div className="ax-field">
        <label className="ax-field__label" htmlFor={emailId}>
          Adresse e-mail
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
        />
        {errors.email && (
          <p className="ax-field__error" id={`${emailId}-error`}>
            {errors.email}
          </p>
        )}
      </div>
      <div className="ax-field">
        <label className="ax-field__label" htmlFor={passwordId}>
          Mot de passe
        </label>
        <input
          id={passwordId}
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? `${passwordId}-error` : undefined}
        />
        {errors.password && (
          <p className="ax-field__error" id={`${passwordId}-error`}>
            {errors.password}
          </p>
        )}
      </div>
      {failure && (
        <p role="alert" className="auth-error">
          {failure}
        </p>
      )}
      <Button
        type="submit"
        loading={loading}
        loadingLabel="Vérification en cours"
        fullWidth
      >
        Se connecter
      </Button>
    </form>
  );
}
