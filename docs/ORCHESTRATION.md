# Orchestration AX-ERP360 — 10 agents

## Principes

- L’agent 01 est l’orchestrateur principal et ne possède pas de domaine de code exclusif.
- Un fichier n’a qu’un propriétaire d’écriture pendant une vague.
- Les interfaces partagées sont proposées par l’auteur, revues par les propriétaires concernés, puis intégrées par l’orchestrateur.
- Chaque livraison significative suit : **Auteur → Reviewer → QA → Orchestrateur**.
- Les branches agents partent d’un socle commun vérifié. Aucun travail non vérifié n’est poussé directement sur `main` après ce socle initial.

## Matrice d’ownership

| Agent | Domaine                                 | Fichiers propriétaires                                                                                                           | Dépendances principales |
| ----: | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
|    01 | Orchestration / architecture principale | `docs/status/**`, intégration des manifests racine, résolution des conflits                                                      | tous les agents         |
|    02 | Architecture entreprise                 | `docs/ARCHITECTURE.md`, `docs/adr/**`, `packages/domain/**`                                                                      | 05, 06, 07, 08          |
|    03 | UX/UI / Design System                   | `DESIGN.md`, `docs/DESIGN_SYSTEM.md`, `packages/ui/**`                                                                           | 04, 09                  |
|    04 | Frontend                                | `apps/web/**` hors tests E2E                                                                                                     | 03, 05, 06, 07          |
|    05 | Modules ERP                             | `docs/MODULE_MAP.md`, `docs/PRODUCT_SCOPE.md`, spécifications `packages/domain/src/modules/**`                                   | 02, 06, 07, 08          |
|    06 | Backend / API                           | `apps/api/**` hors tests                                                                                                         | 02, 05, 07              |
|    07 | Data / Security / RBAC                  | `packages/database/**`, `packages/security/**`, `packages/validation/**`, `docs/SECURITY.md`, `docs/RBAC.md`, `docs/DATABASE.md` | 02, 06, 09              |
|    08 | MEP / BIM / Construction                | `packages/domain/src/mep/**`, `packages/domain/src/bim/**`, `packages/domain/src/construction/**`, documentation métier dédiée   | 02, 05, 07              |
|    09 | QA / Performance / Accessibility        | `apps/*/test/**`, `apps/web/e2e/**`, `packages/*/**/*.test.*`, `docs/TESTING.md`                                                 | 03, 04, 06, 07          |
|    10 | DevOps / GitHub / Release / Review      | `.github/**`, `docker/**`, `Dockerfile*`, `compose*.yml`, `docs/DEPLOYMENT.md`, revue indépendante                               | 01, 06, 07, 09          |

## Branches

| Branche                | Agents auteurs   | But                                  |
| ---------------------- | ---------------- | ------------------------------------ |
| `agent/architecture`   | 02 + revue 01    | architecture, ADR et frontières      |
| `agent/design-system`  | 03 + revue 04/09 | tokens et composants                 |
| `agent/frontend-shell` | 04 + revue 03/09 | login, shell, navigation, responsive |
| `agent/modules`        | 05 + revue 08    | carte métier et premiers verticals   |
| `agent/backend`        | 06 + revue 07/09 | API, services et workflows           |
| `agent/data-security`  | 07 + revue 06/09 | Prisma, tenant, RBAC, audit          |
| `agent/mep-bim`        | 08 + revue 05/09 | invariants construction/MEP/BIM      |
| `agent/qa`             | 09 + revue 10    | tests et budgets qualité             |
| `agent/devops`         | 10 + revue 01/07 | CI, Docker, release                  |

## Ordre d’intégration Vague 1

1. Socle initial et documentation Phase 0.
2. `agent/architecture` + `agent/data-security` : contrats et frontières.
3. `agent/design-system` : tokens et composants primitifs.
4. `agent/backend` + `agent/frontend-shell` en parallèle sur contrats stabilisés.
5. `agent/qa` et `agent/devops` construisent les gates en parallèle.
6. Revue croisée, intégration sur une branche de release, PR vers `main`.

## Règles worktrees

Après le premier commit commun :

```text
C:/Users/dmgpe/AX-ERP360-new               main / orchestration
C:/Users/dmgpe/AX-ERP360-wt/architecture   agent/architecture
C:/Users/dmgpe/AX-ERP360-wt/design-system  agent/design-system
C:/Users/dmgpe/AX-ERP360-wt/frontend-shell agent/frontend-shell
C:/Users/dmgpe/AX-ERP360-wt/modules        agent/modules
C:/Users/dmgpe/AX-ERP360-wt/backend        agent/backend
C:/Users/dmgpe/AX-ERP360-wt/data-security  agent/data-security
C:/Users/dmgpe/AX-ERP360-wt/mep-bim        agent/mep-bim
C:/Users/dmgpe/AX-ERP360-wt/qa             agent/qa
C:/Users/dmgpe/AX-ERP360-wt/devops         agent/devops
```

Une branche ne modifie pas le fichier propriétaire d’une autre branche sans transfert d’ownership documenté dans la PR.

## Statut de l'orchestration

La matrice ci-dessus est un plan de repartition. Le depot possede des commits et une branche de refonte. Voir `status/20260905-FRONTEND-RECOVERY.md` pour le constat actuel : aucun nouvel agent Hermes lance lors de cette reprise.
