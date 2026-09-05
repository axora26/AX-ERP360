import Link from "next/link";
import { LoginForm } from "../../components/LoginForm";
export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="panel login-panel">
        <span className="badge">AXORA GROUP SARLU · DÉMONSTRATION</span>
        <h1>AX-ERP360</h1>
        <p>La nouvelle interface est consultable sans compte de production.</p>
        <LoginForm />
        <Link className="button primary" href="/operations">
          Explorer la démonstration
        </Link>
      </section>
    </main>
  );
}
