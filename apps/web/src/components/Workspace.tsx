"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Icon, type IconName } from "./icons";
import { navigationItems } from "../navigation";
import {
  demoProjects,
  exportCsv,
  filterProjects,
  money,
  normalize,
  statusLabels,
  summarize,
  type DemoProject,
} from "../lib/demo-data";
type Mode = "ready" | "empty" | "loading" | "error";
type Panel = "navigation" | "search" | "project" | "alerts";
const pending: Readonly<Record<string, string>> = {
  commercial: "Clients, devis et opportunités commerciales",
  procurement: "Fournisseurs, commandes et approvisionnements",
  engineering:
    "Mécanique, électricité et plomberie (MEP) ; modélisation des informations du bâtiment (BIM)",
  quality: "Qualité, hygiène, sécurité et environnement (QHSE)",
  assets:
    "Équipements, actifs et gestion de maintenance assistée par ordinateur",
};
export function Workspace({ section }: { section: string }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [mode, setMode] = useState<Mode>("ready");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [panel, setPanel] = useState<Panel>("search");
  const [command, setCommand] = useState("");
  const [selected, setSelected] = useState<DemoProject | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const modal = useRef<HTMLDialogElement>(null);
  const title =
    section === "operations"
      ? "Centre de pilotage"
      : (navigationItems.find((item) => item.href === `/${section}`)?.label ??
        "Module");
  const items = mode === "ready" ? demoProjects : [];
  const filtered = filterProjects(items, query, status);
  const summary = summarize(items);
  const showData = ["operations", "projects", "finance"].includes(section);
  const alerts = items.filter((p) => p.status === "attention");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPanel("search");
        setCommand("");
        modal.current?.showModal();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, []);
  function open(next: Panel) {
    setPanel(next);
    setCommand("");
    modal.current?.showModal();
  }
  function detail(project: DemoProject) {
    setSelected(project);
    open("project");
  }
  function reset() {
    setMode("ready");
    setQuery("");
    setStatus("all");
  }
  function download() {
    const rows = section === "finance" ? items : filtered;
    const url = URL.createObjectURL(
      new Blob([exportCsv(rows)], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "AX-ERP360-DEMONSTRATION.csv";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setAnnouncement(
      "Export de données fictives généré. Aucune valeur comptable.",
    );
  }
  const stats: readonly [string, string, string, IconName][] = [
    [
      "Projets actifs",
      String(summary.active).padStart(2, "0"),
      `${summary.count} projets fictifs au total`,
      "projects",
    ],
    [
      "Budget du portefeuille",
      money(summary.budgetCents),
      "Budgets initiaux de démonstration",
      "finance",
    ],
    [
      "Engagements simulés",
      money(summary.committedCents),
      "Aucune valeur comptable",
      "commercial",
    ],
    [
      "Points d’attention",
      String(summary.attention).padStart(2, "0"),
      "Scénarios de suivi fictifs",
      "quality",
    ],
  ];
  return (
    <div className="workspace-root">
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <aside className="desktop-sidebar">
        <Sidebar pathname={`/${section}`} />
        <div className="sidebar-footer">
          <span className="badge">DESIGN PREVIEW · 01</span>
          <p>
            Maîtriser la technique.
            <br />
            Transformer l’avenir.
          </p>
          <small>AXORA GROUP SARLU</small>
        </div>
      </aside>
      <div className="workspace-app">
        <header className="topbar">
          <button
            type="button"
            className="icon-button mobile-menu"
            aria-label="Ouvrir la navigation"
            onClick={() => open("navigation")}
          >
            <Icon name="menu" />
          </button>
          <span className="workspace-context">
            Espace de travail <span>/</span> <strong>{title}</strong>
          </span>
          <button
            type="button"
            className="search-trigger"
            aria-label="Rechercher un projet ou un module"
            onClick={() => open("search")}
          >
            <Icon name="search" />
            <span>Rechercher un projet ou un module</span>
            <kbd>Ctrl K</kbd>
          </button>
          <div className="topbar-tools">
            <button
              type="button"
              className="theme-button"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-pressed={theme === "dark"}
            >
              {theme === "light" ? "Mode sombre" : "Mode clair"}
            </button>
            <button
              type="button"
              className="icon-button"
              aria-label="Alertes de démonstration"
              onClick={() => open("alerts")}
            >
              <Icon name="bell" />
            </button>
            <Link
              className="avatar"
              href="/login"
              aria-label="État de la connexion"
            >
              AX
            </Link>
          </div>
        </header>
        <div className="demo-banner">
          <span>
            <strong>Démonstration</strong>
            <span className="demo-detail">
              {" "}
              — Données fictives. Aucun système de production connecté.
            </span>
          </span>
          <label className="simulation-label">
            État de l’interface
            <select
              aria-label="État de l’interface"
              value={mode}
              onChange={(event) => {
                setMode(event.target.value as Mode);
                setQuery("");
                setStatus("all");
              }}
            >
              <option value="ready">Démonstration</option>
              <option value="empty">Données vides</option>
              <option value="loading">Chargement simulé</option>
              <option value="error">Erreur simulée</option>
            </select>
          </label>
        </div>
        <main id="main" tabIndex={-1}>
          <div className="page-heading">
            <div>
              <p className="eyebrow">AXORA / {title}</p>
              <h1>{title}</h1>
              <p>
                Une vision claire de vos projets, de vos engagements et de vos
                priorités.
              </p>
            </div>
            {showData && (
              <button
                type="button"
                className="button"
                disabled={mode !== "ready"}
                onClick={download}
              >
                Exporter la démo
              </button>
            )}
          </div>
          {mode === "loading" || mode === "error" ? (
            <section
              className="panel state-panel"
              role={mode === "error" ? "alert" : "status"}
              aria-busy={mode === "loading"}
            >
              <Icon
                name={mode === "error" ? "quality" : "operations"}
                size={32}
              />
              <h2>
                {mode === "error"
                  ? "Simulation : source indisponible"
                  : "Simulation : chargement des données"}
              </h2>
              <p>
                Cette simulation locale ne représente pas une panne réelle ni
                une requête réseau.
              </p>
              {mode === "loading" && (
                <div className="skeleton" aria-hidden="true" />
              )}
              <button type="button" className="button primary" onClick={reset}>
                Revenir à la démonstration
              </button>
            </section>
          ) : showData ? (
            <>
              <section
                className="stats"
                aria-label="Indicateurs de démonstration"
              >
                {stats.map(([label, value, note, icon]) => (
                  <article className="stat" key={label}>
                    <div className="stat-top">
                      <span>{label}</span>
                      <span className="stat-icon">
                        <Icon name={icon} size={17} />
                      </span>
                    </div>
                    <p className="stat-value">{value}</p>
                    <p className="stat-note">{note}</p>
                  </article>
                ))}
              </section>
              <div
                className={
                  section === "operations"
                    ? "workspace-grid"
                    : "workspace-grid full"
                }
              >
                <div className="stack">
                  <section className="panel">
                    <div className="panel-heading">
                      <div>
                        <h2>
                          {section === "finance"
                            ? "Situation budgétaire"
                            : "Portefeuille projets"}{" "}
                          <span className="count">
                            {section === "finance"
                              ? items.length
                              : filtered.length}
                          </span>
                        </h2>
                        <p>
                          {section === "finance"
                            ? "Dollars américains (USD) · aucune conversion de devise"
                            : "Avancement et priorités · données fictives"}
                        </p>
                      </div>
                      {section === "operations" && (
                        <Link href="/projects">
                          Tous les projets{" "}
                          <Icon name="chevronRight" size={16} />
                        </Link>
                      )}
                    </div>
                    {section !== "finance" && (
                      <div className="table-toolbar">
                        <div className="field-search">
                          <Icon name="search" size={18} />
                          <label
                            className="ax-visually-hidden"
                            htmlFor="project-search"
                          >
                            Filtrer les projets
                          </label>
                          <input
                            id="project-search"
                            type="search"
                            placeholder="Nom, référence, discipline…"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                          />
                        </div>
                        <label
                          className="ax-visually-hidden"
                          htmlFor="project-status"
                        >
                          Statut du projet
                        </label>
                        <select
                          id="project-status"
                          value={status}
                          onChange={(event) => setStatus(event.target.value)}
                        >
                          <option value="all">Tous les statuts</option>
                          {Object.entries(statusLabels).map(([key, label]) => (
                            <option key={key} value={key}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {(section === "finance" ? items : filtered).length === 0 ? (
                      <div className="state-panel">
                        <Icon name="search" size={30} />
                        <h2>Aucun projet à afficher</h2>
                        <p>
                          {mode === "empty"
                            ? "Simulation d’une source vide. Aucune donnée réelle n’a été supprimée."
                            : "Aucun projet fictif ne correspond aux filtres."}
                        </p>
                        <button
                          type="button"
                          className="button"
                          onClick={reset}
                        >
                          Réinitialiser la démonstration
                        </button>
                      </div>
                    ) : (
                      <table className="project-table">
                        <caption className="ax-visually-hidden">
                          Portefeuille de projets entièrement fictifs
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">Projet</th>
                            <th scope="col">
                              {section === "finance"
                                ? "Budget initial"
                                : "Phase"}
                            </th>
                            <th scope="col">Statut</th>
                            <th scope="col">
                              {section === "finance"
                                ? "Engagement"
                                : "Avancement"}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(section === "finance" ? items : filtered).map(
                            (project) => (
                              <tr key={project.id}>
                                <td>
                                  <button
                                    type="button"
                                    className="project-link"
                                    onClick={() => detail(project)}
                                  >
                                    {project.name}
                                    <small>
                                      {project.id} · {project.discipline}
                                    </small>
                                  </button>
                                </td>
                                <td
                                  data-label={
                                    section === "finance"
                                      ? "Budget initial"
                                      : "Phase"
                                  }
                                >
                                  {section === "finance"
                                    ? money(project.budgetCents)
                                    : project.phase}
                                </td>
                                <td data-label="Statut">
                                  <span className={`pill ${project.status}`}>
                                    {statusLabels[project.status]}
                                  </span>
                                </td>
                                <td
                                  data-label={
                                    section === "finance"
                                      ? "Engagement"
                                      : "Avancement"
                                  }
                                  className="progress-cell"
                                >
                                  {section === "finance" ? (
                                    money(project.committedCents)
                                  ) : (
                                    <>
                                      <span>{project.progress} %</span>
                                      <progress
                                        aria-label={`Avancement fictif de ${project.name}`}
                                        value={project.progress}
                                        max={100}
                                      >
                                        {project.progress} %
                                      </progress>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    )}
                    <div className="table-bottom">
                      <span role="status">
                        {section === "finance" ? items.length : filtered.length}{" "}
                        résultats
                      </span>
                      <span>DÉMONSTRATION · Lecture seule</span>
                    </div>
                  </section>
                  {section === "operations" && (
                    <section className="panel">
                      <div className="panel-heading">
                        <div>
                          <h2>Accès rapides</h2>
                          <p>Un espace de travail pour tous vos métiers</p>
                        </div>
                      </div>
                      <div className="quick-links">
                        <Link href="/projects">
                          <Icon name="projects" />
                          Suivre les projets
                        </Link>
                        <Link href="/finance">
                          <Icon name="finance" />
                          Lire les budgets
                        </Link>
                        <Link href="/engineering">
                          <Icon name="engineering" />
                          Ingénierie
                        </Link>
                      </div>
                    </section>
                  )}
                </div>
                {section === "operations" && (
                  <div className="stack side-stack">
                    <section className="panel">
                      <div className="panel-heading">
                        <div>
                          <h2>À votre attention</h2>
                          <p>Scénarios de démonstration</p>
                        </div>
                        <span className="count">{alerts.length}</span>
                      </div>
                      {alerts.length ? (
                        alerts.map((project) => (
                          <article className="alert-item" key={project.id}>
                            <span className="alert-marker">
                              <Icon name="quality" size={17} />
                            </span>
                            <div>
                              <h3>{project.name}</h3>
                              <p>
                                {project.phase} : point de suivi fictif à
                                examiner.
                              </p>
                              <button
                                type="button"
                                className="text-button"
                                onClick={() => detail(project)}
                              >
                                Examiner la démo{" "}
                                <Icon name="chevronRight" size={14} />
                              </button>
                            </div>
                          </article>
                        ))
                      ) : (
                        <p className="scope-note">
                          Aucune alerte dans cette simulation.
                        </p>
                      )}
                    </section>
                    <section className="panel">
                      <div className="panel-heading">
                        <div>
                          <h2>Lecture budgétaire</h2>
                          <p>Engagements / budget initial · simulation</p>
                        </div>
                      </div>
                      <div className="budget-breakdown">
                        {items.slice(0, 3).map((project) => (
                          <div className="budget-line" key={project.id}>
                            <div>
                              <span>{project.name}</span>
                              <strong>{money(project.committedCents)}</strong>
                            </div>
                            <progress
                              aria-label={`Engagement fictif de ${project.name}`}
                              value={project.committedCents}
                              max={project.budgetCents}
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                    <section className="panel scope-note">
                      <span className="badge">PÉRIMÈTRE DE CETTE VERSION</span>
                      <p>
                        <strong>Une interface à explorer.</strong>
                        <br />
                        Navigation, filtres, détails et export de démonstration.
                        Authentification, paiements et connexions serveur non
                        implémentés.
                      </p>
                    </section>
                  </div>
                )}
              </div>
            </>
          ) : (
            <section className="panel state-panel">
              <Icon name="engineering" size={32} />
              <span className="badge">À VENIR · NON IMPLÉMENTÉ</span>
              <h2>{pending[section] ?? title}</h2>
              <p>
                Ce domaine est prévu dans AX-ERP360. Aucune fonction métier
                opérationnelle n’est présentée comme terminée.
              </p>
              <button type="button" className="button" disabled>
                Disponible après intégration serveur
              </button>
              <Link className="text-button" href="/operations">
                Revenir au centre de pilotage
              </Link>
            </section>
          )}
        </main>
        <footer className="footer">
          <span>AX-ERP360 · AXORA GROUP SARLU</span>
          <span>
            Prototype d’interface — pas un système de gestion opérationnel
          </span>
        </footer>
      </div>
      <nav className="bottom-navigation" aria-label="Navigation mobile">
        {navigationItems
          .filter((item) =>
            ["/operations", "/projects", "/finance"].includes(item.href),
          )
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === `/${section}` ? "page" : undefined}
            >
              <Icon
                name={
                  item.href === "/finance"
                    ? "finance"
                    : item.href === "/projects"
                      ? "projects"
                      : "operations"
                }
              />
              {item.href === "/operations" ? "Pilotage" : item.label}
            </Link>
          ))}
        <button type="button" onClick={() => open("navigation")}>
          <Icon name="menu" />
          Plus
        </button>
      </nav>
      <dialog
        ref={modal}
        aria-labelledby="dialog-title"
        className={
          panel === "navigation" ? "navigation-dialog" : "workspace-dialog"
        }
      >
        <div className="dialog-heading">
          <h2 id="dialog-title">
            {panel === "navigation"
              ? "Navigation"
              : panel === "project"
                ? selected?.name
                : panel === "alerts"
                  ? "Alertes fictives"
                  : "Recherche rapide"}
          </h2>
          <button
            type="button"
            className="icon-button"
            aria-label="Fermer la fenêtre"
            onClick={() => modal.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        {panel === "navigation" && (
          <Sidebar
            pathname={`/${section}`}
            onNavigate={() => modal.current?.close()}
          />
        )}
        {panel === "search" && (
          <>
            <label htmlFor="command-search">Projet, référence ou module</label>
            <input
              id="command-search"
              type="search"
              placeholder="Rechercher dans la démonstration"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
            />
            <p className="scope-note">
              Recherche locale. Aucun résultat de production.
            </p>
            <div className="command-results">
              {navigationItems
                .filter((item) =>
                  normalize(item.label).includes(normalize(command)),
                )
                .map((item) => (
                  <Link
                    className="search-result"
                    key={item.href}
                    href={item.href}
                    onClick={() => modal.current?.close()}
                  >
                    <span>{item.label}</span>
                    <small>
                      {["/operations", "/projects", "/finance"].includes(
                        item.href,
                      )
                        ? "Prototype"
                        : "À venir"}
                    </small>
                  </Link>
                ))}
              {filterProjects(items, command).map((project) => (
                <button
                  className="search-result"
                  type="button"
                  key={project.id}
                  onClick={() => detail(project)}
                >
                  <span>{project.name}</span>
                  <small>{project.id} · fictif</small>
                </button>
              ))}
              {!filterProjects(items, command).length &&
                !navigationItems.some((item) =>
                  normalize(item.label).includes(normalize(command)),
                ) && <p role="status">Aucun résultat.</p>}
            </div>
          </>
        )}
        {panel === "project" && selected && (
          <>
            <span className="badge">PROJET FICTIF · {selected.id}</span>
            <p className="scope-note">
              Détail de démonstration en lecture seule. Aucun chantier réel
              représenté.
            </p>
            <dl className="detail-grid">
              {[
                ["Discipline", selected.discipline],
                ["Phase", selected.phase],
                ["Statut", statusLabels[selected.status]],
                ["Avancement fictif", `${selected.progress} %`],
                ["Budget fictif", money(selected.budgetCents)],
                ["Engagement fictif", money(selected.committedCents)],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
        {panel === "alerts" && (
          <>
            <p className="scope-note">
              Ces alertes sont fictives, sans valeur opérationnelle.
            </p>
            {alerts.length ? (
              alerts.map((project) => (
                <button
                  className="search-result"
                  type="button"
                  key={project.id}
                  onClick={() => detail(project)}
                >
                  <span>{project.name}</span>
                  <small>À surveiller · démo</small>
                </button>
              ))
            ) : (
              <p>Aucune alerte dans cette simulation.</p>
            )}
          </>
        )}
      </dialog>
      <div className="ax-visually-hidden" role="status" aria-live="polite">
        {announcement}
      </div>
    </div>
  );
}
