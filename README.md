# AX-ERP360

**La plateforme ERP nouvelle génération d’AXORA GROUP SARLU.**

> Maîtriser la technique. Transformer l’avenir.

AX-ERP360 est une nouvelle application, conçue comme un monolithe modulaire orienté domaines pour relier management, finance, projets, construction, ingénierie MEP, BIM, achats, stocks, RH, QHSE, commissioning, actifs, GMAO, Smart Building, énergie, documentation et analytique.

## État actuel

Le dépôt est en initialisation. Aucun module n’est déclaré prêt tant que les contrôles correspondants ne sont pas exécutés et rattachés au SHA exact dans `docs/PRODUCT_READINESS.md`.

## Architecture cible

```text
apps/
  web/          Next.js / React
  api/          NestJS REST API
packages/
  ui/           Design System et composants accessibles
  database/     Prisma et PostgreSQL
  security/     authentification et primitives RBAC
  types/        contrats TypeScript partagés
  config/       configuration validée
  validation/   schémas de validation partagés
  domain/       primitives métier sans dépendance framework
docs/           architecture, sécurité, produit et exploitation
```

Style architectural : **modular-monolith-first**. Les règles métier, l’autorisation, les transactions et l’audit appartiennent au serveur. Le navigateur ne constitue jamais une frontière de sécurité.

## Prérequis

- Node.js `>=24.0.0 <25`
- pnpm `11.4.0`
- PostgreSQL 18 pour le développement intégré
- Docker / Docker Compose pour l’environnement conteneurisé

Les versions ont été retenues après inspection statique d’AXORA ERP3602 au SHA `7d19e216f660087b474588763cb722296ef37084`. Elles restent soumises à la qualification de la nouvelle application.

## Commandes prévues

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

Elles ne doivent être considérées opérationnelles qu’après création des applications et premier contrôle réel.

## Documentation

- `docs/SOURCE_AUDIT.md` — audit de la référence AXORA ERP3602
- `docs/ORCHESTRATION.md` — matrice des dix agents et ownership
- `docs/MODEL_QUALIFICATION.md` — disponibilité réellement testée des modèles
- `docs/ARCHITECTURE.md` — architecture cible
- `docs/DESIGN_SYSTEM.md` — système visuel et UX
- `docs/PRODUCT_READINESS.md` — preuves par module

## Vérité produit

- Toute donnée de démonstration doit porter explicitement la mention **Démonstration**.
- Une action est fonctionnelle, désactivée ou marquée **À venir**.
- Aucun statut `PASS` n’est attribué sans contrôle exécuté.
- Aucun secret réel ne doit être commité.

## Nouvelle interface de demonstration

Consulter [le guide de lancement et les captures](docs/FRONTEND_PREVIEW.md) et [les preuves et limites de cette livraison](docs/status/20260905-FRONTEND-RECOVERY.md). Le controle `check:web` ne qualifie pas le serveur metier.
