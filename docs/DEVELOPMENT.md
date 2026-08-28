# Développement AX-ERP360

## Prérequis

- Node.js 24.x
- pnpm 11.4.0
- PostgreSQL 18 ou Docker Compose

## Installation prévue

```bash
pnpm install --frozen-lockfile
cp .env.example .env
pnpm db:generate
pnpm db:migrate:dev
pnpm dev
```

Le fichier `.env` local n’est jamais commité.

## Branches

- `main` : intégration protégée.
- `agent/*` : ownership défini dans `ORCHESTRATION.md`.
- Commits Conventional Commits, atomiques et réversibles.
- PR avec SHA, tests réellement exécutés, risques et limites.

## Definition of Done

Voir `TESTING.md` et `PRODUCT_READINESS.md`. Une page qui s’affiche seulement n’est pas terminée.
