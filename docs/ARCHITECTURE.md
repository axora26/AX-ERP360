# Architecture AX-ERP360

## Objectif

AX-ERP360 adopte une architecture **modular-monolith-first** : un déploiement API principal, organisé en domaines isolés, avec possibilité d’extraire un service uniquement après mesure d’un besoin de scalabilité, disponibilité ou autonomie de cycle de vie.

## Principes obligatoires

1. Le navigateur n’est jamais une frontière de sécurité.
2. L’API possède les règles métier, l’autorisation, les transactions et l’audit.
3. Tout endpoint non public requiert une policy explicite ; absence de policy = refus.
4. Le tenant et la société actifs proviennent de la session serveur.
5. Un domaine ne modifie pas directement les tables propriétaires d’un autre domaine.
6. Les effets cross-domain critiques utilisent une transaction locale ou une outbox transactionnelle.
7. Argent, quantité et mesure utilisent des représentations exactes avec unité/devise explicite.
8. Aucun événement métier critique n’est perdu silencieusement.

## Structure

```text
apps/
  web/          Next.js App Router, React Server Components par défaut
  api/          NestJS REST, application services et policies
packages/
  ui/           tokens, primitives, patterns, Data Grid
  database/     Prisma, migrations, client et transaction boundary
  security/     sessions, password, MFA, RBAC policy primitives
  types/        contrats de transport sans dépendance framework
  config/       configuration typée et validation au démarrage
  validation/   schémas de validation partagés
  domain/       value objects, états, événements et ports métier
docs/
  adr/          décisions d’architecture immuables
```

## Couches

```text
Web / API controllers
        ↓
Application services / commands / queries
        ↓
Domain policies, value objects, state machines
        ↓
Ports repository / event publisher
        ↓
Prisma adapters / PostgreSQL / outbox
```

Les contrôleurs traduisent HTTP et délèguent. Ils ne portent pas de calcul métier critique. Les repositories Prisma restent derrière les services d’application.

## Bounded contexts initiaux

- Platform : identity, tenant, company, RBAC, audit, configuration.
- Commercial : CRM, studies, BOQ/DQE/BPU, quote, contract.
- Project Delivery : projects, WBS/CBS, site, planning, cost control.
- Supply Chain : procurement, suppliers, inventory, logistics.
- Finance : AR/AP initialement ; GL futur gouverné séparément.
- People : HR, attendance, payroll.
- Information Management : GED, RFI, submittals, transmittals.
- Engineering : MEP, BIM/IFC, construction data.
- Quality & Handover : QHSE, commissioning.
- Operations : assets, GMAO, field service.
- Connected Building : Smart Building, IoT, Energy.
- Intelligence : analytics, automation, AI evidence/integration.

## Contrats et dépendances

- `packages/types` contient les DTO publics et événements versionnés, pas les modèles Prisma.
- `packages/domain` ne dépend ni de NestJS, ni de Next.js, ni de Prisma.
- `packages/security` ne dépend pas de l’UI.
- `apps/web` dépend de `ui`, `types` et `validation`, jamais de `database`.
- `apps/api` dépend de `domain`, `types`, `validation`, `security`, `database`.
- Les dépendances cycliques entre contextes sont interdites.

## Transactions et événements

- Transaction ACID locale pour les invariants d’un même use case.
- Verrou transactionnel ou advisory lock pour numérotation, cumul et concurrence critique.
- Table outbox écrite dans la même transaction que l’agrégat.
- Consumer idempotent avec clé d’événement stable.
- Aucun message externe envoyé avant commit.
- Les projections sont reconstruisibles depuis leur source autoritative lorsque pertinent.

## Multi-tenant

Le niveau d’isolation initial est **shared database / shared schema** avec `organizationId` et `companyId` sur les objets concernés, renforcé par :

- contexte issu de la session ;
- repository scoping obligatoire ;
- relations composites et index de scope ;
- tests cross-tenant ;
- contraintes/triggers PostgreSQL sur invariants critiques ;
- journaux d’audit append-only.

Row-Level Security (RLS) PostgreSQL pourra être ajoutée après une qualification explicite de la stratégie de pool et du contexte de transaction ; elle ne sera pas simulée par une variable globale fragile.

## API

- Base : `/api/v1`.
- REST orienté ressources, commandes explicites pour transitions (`:approve`, `:close`).
- Validation stricte et rejet des propriétés inconnues.
- Erreurs au format Problem Details, sans fuite de stack ou d’existence cross-tenant.
- Pagination serveur par curseur pour grands volumes ; limite maximale imposée.
- Idempotency-Key sur commandes rejouables.
- OpenAPI généré et contrôlé en CI.

## Observabilité

- `requestId` / `correlationId` propagé web → API → DB/outbox.
- Logs JSON structurés, sans secret ni donnée sensible brute.
- Métriques RED : Rate, Errors, Duration.
- Health checks distincts : live, ready, dependency.
- Traces OpenTelemetry lorsque le coût et l’infrastructure sont qualifiés.
- SLO définis avant alerte de production.

## Performance

- RSC et chargement progressif côté web.
- Pagination et filtres serveur pour les grilles.
- Détection N+1 en revue et tests d’intégration ciblés.
- Index justifiés par requête, `EXPLAIN ANALYZE` avant claim d’optimisation.
- Budgets CI : bundle, Web Vitals synthétiques, temps API et taille réponse.

## ADR prioritaires

1. Modular monolith et règles d’extraction.
2. Stratégie multi-tenant et enforcement DB.
3. Autorisation fail-closed par policy explicite.
4. Transactions, outbox et idempotence.
5. Décimales, unités, devises et arrondis.
6. Gouvernance des fichiers GED/BIM.
7. Vérité des statuts et evidence-based readiness.

Hypothèses — Déploiement initial pour AXORA avec plusieurs sociétés dans une base PostgreSQL partagée.

Limites — La topologie production, les volumes et SLO métier ne sont pas encore fournis.

Niveau de confiance — Élevé sur le socle ; moyen sur les décisions de capacité faute de mesures de charge.
