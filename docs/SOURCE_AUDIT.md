# Audit de la source AXORA ERP3602

## 1. Référence et méthode

- Dépôt : `axora26/AXORA-ERP3602`
- Copie locale d’audit : `C:/Users/dmgpe/AX-ERP360-source-readonly`
- Branche : `main`
- SHA audité : `7d19e216f660087b474588763cb722296ef37084`
- État local observé : propre et aligné avec `origin/main`
- Mode : lecture seule ; aucun fichier de la source n’a été modifié.

Cet audit combine inspection statique, inventaire Git et vérification GitHub des checks rattachés au SHA. Les tests de la source n’ont pas été réexécutés localement. En conséquence :

- **Fonction existante vérifiée** : code persistant/API/UI et tests identifiés, avec check GitHub réussi sur le SHA audité ;
- **Fonction partielle** : fondation réelle mais insuffisante pour le domaine annoncé ;
- **Fonction uniquement visuelle** : écran ou calcul client sans autorité persistée ;
- **Fonction absente** : aucun workflow correspondant identifié ;
- **Non vérifié** : preuve insuffisante ou qualification attachée à un autre SHA.

## 2. Faits de dépôt

| Élément                                |                  Observation vérifiée |
| -------------------------------------- | ------------------------------------: |
| Fichiers suivis                        |                                   807 |
| Lignes suivies sur extensions auditées |                                27 670 |
| Applications                           |                `apps/web`, `apps/api` |
| Packages                               | `database`, `security`, `types`, `ui` |
| Contrôleurs NestJS                     |                                    56 |
| Services NestJS                        |                                    75 |
| Modules API                            |             34, plus le module racine |
| Routes Next.js `page.tsx`              |                                    49 |
| Modèles du `schema.prisma` principal   |                                    63 |
| Enums du `schema.prisma` principal     |                                    20 |
| Migrations PostgreSQL                  |                                    67 |
| Tests `*.test.ts` identifiés           |                                    35 |
| Tests API `*.e2e.ts` identifiés        |                                    64 |
| Scripts web `.mjs`                     |                                    18 |
| Workflows GitHub Actions `.yml`        |                                    10 |

Le schéma effectif est plus large que le seul `schema.prisma` principal : des fragments et migrations SQL ajoutent des modèles et invariants récents. Toute migration doit donc inventorier le dossier Prisma complet.

## 3. Architecture réellement implémentée

### Faits vérifiés

- Monorepo pnpm et TypeScript strict.
- Frontend Next.js App Router et React.
- API REST NestJS modulaire.
- Prisma/PostgreSQL avec migrations, Decimal et contraintes SQL.
- Session opaque en cookie, MFA optionnelle, audit, protections d’origine et permissions serveur.
- API propriétaire des règles métier, de l’autorisation, des transactions et de l’audit.
- Proxy web `/api/*` vers l’API.
- Docker/Compose et plusieurs gates GitHub Actions.

### Versions observées

| Technologie          | Version source |
| -------------------- | -------------: |
| Node.js              | `>=24.0.0 <25` |
| pnpm                 |       `11.4.0` |
| TypeScript           |        `5.9.3` |
| Next.js              |      `16.2.11` |
| React / React DOM    |       `19.2.8` |
| NestJS               |      `11.1.28` |
| Prisma CLI           |        `7.9.1` |
| `@prisma/client`     |        `7.8.0` |
| PostgreSQL conteneur |    `18-alpine` |
| Tailwind CSS         |        `4.3.1` |

**Dette à corriger :** la source mélange Prisma CLI `7.9.1`, adapter `7.9.1` et client `7.8.0`. AX-ERP360 doit aligner les versions avant qualification.

## 4. Audit fonctionnel

> « Vérifiée » signifie ici que la tranche verticale observée possède des preuves au SHA audité. Cela ne signifie pas que le domaine complet est prêt pour production.

| Domaine                                          | État                                                             | Capacités observées                                                                                | Limites / amélioration AX-ERP360                                                                                                                                                                                  |
| ------------------------------------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Organisation, sociétés, identité, session, audit | **Fonction existante vérifiée**                                  | Organisations, sociétés, branches, membres, sessions, audit et contexte actif                      | Formaliser une policy de contexte unique et des tests de concurrence                                                                                                                                              |
| RBAC                                             | **Partiel malgré preuves**                                       | Permissions typées, gardes globaux, séparation de plusieurs actions                                | `PermissionGuard` autorise une route authentifiée sans décorateur de permission ; ce comportement n’est pas deny-by-default au sens strict. AX-ERP360 doit refuser toute route non publique sans policy explicite |
| CRM                                              | **Fonction existante vérifiée pour la tranche**                  | Comptes, contacts, leads, opportunités, activités, workspace `/crm`                                | Campagnes, scoring, territoires, synchronisation email/calendrier et forecast avancé absents                                                                                                                      |
| Études / DQE                                     | **Partiel**                                                      | DQE versionné, quantités/prix exacts, unités/devise, workflow                                      | BOQ hiérarchique, BPU maître/versionné, ressources, alternatives, taxes, marges et quantités BIM absents                                                                                                          |
| Devis / contrats                                 | **Fonction existante vérifiée pour la tranche**                  | Révisions, acceptation, contrats, variations et provenance                                         | Signature qualifiée, retenues, garanties, claims, notices et fiscalité absents                                                                                                                                    |
| Achats                                           | **Fonction existante vérifiée pour la tranche**                  | Fournisseurs, demandes, approbation, commandes, réceptions partielles                              | RFQ/appels d’offres, comparaison, contrats-cadres, sous-traitants et matching 2/3 voies absents                                                                                                                   |
| Stocks / logistique                              | **Fonction existante vérifiée pour la tranche**                  | Ledger immuable, soldes, transferts, ajustements, non-négativité                                   | Valorisation, lots/séries, péremption, réservations, inventaire tournant et réapprovisionnement absents                                                                                                           |
| Projets / WBS / chantier                         | **Fonction existante vérifiée pour la tranche**                  | Projet, WBS, budgets feuilles, zones, journaux, progrès et incidents                               | Gantt/CPM, ressources, earned value, look-ahead, claims, RFI et submittals absents                                                                                                                                |
| Cost Control                                     | **Partiel**                                                      | Baselines, commitments, received actuals, payroll actuals, forecasts et rapports                   | Certains écrans de scénarios/réserves/mobilisation sont explicitement non persistés ; CPI/SPI et règles d’earned value absents                                                                                    |
| Finance                                          | **Partiel**                                                      | AR/AP, factures, paiements, soldes et preuves exactes                                              | Comptabilité générale, plan de comptes, journaux, périodes, taxes, trésorerie, banque, SYSCOHADA absents                                                                                                          |
| RH / présence / paie                             | **Partiel**                                                      | Employés, temps, présence, runs de paie, règles configurables, bulletins                           | Conformité juridictionnelle, congés, recrutement, avantages, déclarations et notes de frais absents                                                                                                               |
| GED                                              | **Partiel**                                                      | Registre, versions immuables, hash, revue, archivage, preuves de signature                         | Stockage binaire/CDE, OCR, recherche, rétention, RFI, transmittals, submittals, BCF et ISO 19650 absents                                                                                                          |
| QHSE                                             | **Partiel**                                                      | Inspections, constats, actions et clôture séparée                                                  | Référentiels légaux, JSA, permis, incidents réglementaires et audits normatifs absents                                                                                                                            |
| MEP                                              | **Partiel très étroit**                                          | Trois calculs SI persistés : chaleur sensible, puissance triphasée équilibrée, vitesse hydraulique | Aucun dimensionnement réseau, pertes de charge, protections, sélectivité, plomberie/incendie ou moteur normatif                                                                                                   |
| BIM / IFC                                        | **Partiel — registre de métadonnées**                            | Modèles/versions externes, hash, éléments, équipements et bindings                                 | Pas de parsing IFC/Revit, visualiseur, GUID normalisés, clash, BCF, COBie ou quantification                                                                                                                       |
| Commissioning                                    | **Partiel**                                                      | Activités, résultats, punch, preuves et équipements                                                | Exécution ne signifie ni acceptation ni réception ; templates normatifs, witness/hold points et handover absents                                                                                                  |
| Assets / GMAO                                    | **Fonction existante vérifiée pour la tranche, domaine partiel** | Passeports actifs, plans, occurrences, OT, stock/main-d’œuvre/télémétrie/documents                 | Criticité, hiérarchie, compteurs, SLA, compétences, MTBF/MTTR et coûts de cycle de vie absents                                                                                                                    |
| Smart Building / Energy / IoT                    | **Partiel**                                                      | Points, lectures, intervalles énergie et ingestion batch idempotente                               | BACnet/Modbus/KNX/MQTT, commandes, alarmes, BMS, tarifs, M&V, carbone et optimisation absents                                                                                                                     |
| Analytics / Automation / AI                      | **Partiel**                                                      | Snapshots, règles/événements et registre de preuves d’inférence                                    | Les appels de modèles, l’orchestration de décisions et les contrôles humains restent hors du slice                                                                                                                |
| Academy / Portails                               | **Fonction existante vérifiée pour la tranche**                  | Cours, inscriptions, portails client/fournisseur et grants explicites                              | Extension fonctionnelle et intégrations externes non démontrées                                                                                                                                                   |

## 5. UX/UI source

### Faits vérifiés

- Shell global, navigation, lanceur de modules, centre de notifications et nombreux workspaces.
- États partagés : contexte requis, accès refusé, prérequis, vide, erreur, chargement.
- Skip link et styles `focus-visible`.
- Thème dark imposé par la classe `axora-premium-dark`.
- Plusieurs feuilles de styles historiques sont chargées simultanément : `globals.css`, `executive-theme.css`, `premium-shell.css`, `premium-dark.css`, `brand-charter.css`.

### Dette et opportunités

- Accumulation de couches CSS et overrides : risque de spécificité, incohérence et coût de maintenance.
- Le package UI ne contient qu’un petit ensemble de primitives ; les workspaces portent beaucoup de styles/structures locales.
- La version mobile remplace principalement la grille/sidebar plutôt que de définir une navigation chantier mobile dédiée.
- Le dashboard comporte des « monument stats », gradients et blur marqués ; AX-ERP360 doit privilégier une surface **Monitor/Operate** dense, lisible et orientée décision.
- Le mode clair est défini partiellement mais n’est pas activable dans le shell audité.

## 6. Sécurité et données

### Patrons à réutiliser

1. Contexte organisation/société dérivé de la session, jamais de l’entrée utilisateur comme autorité.
2. Clés et contraintes composites pour prévenir les relations cross-tenant.
3. Décimales exactes et unités/devises explicites.
4. Ledgers et preuves append-only.
5. Idempotence métier sur les opérations critiques.
6. Transitions d’état explicites et statuts terminaux gelés.
7. Transactions et verrouillage sur cumuls concurrents.
8. Audit des actions sensibles et corrélation des requêtes.

### Risques

- La route authentifiée sans décorateur de permission est autorisée par `PermissionGuard`; le nom « deny-by-default » dans les docs est donc plus large que le code de ce garde isolé.
- Le modèle Prisma principal ne constitue pas l’inventaire complet des données effectives.
- Les frontières de services sont nombreuses mais la base reste fortement partagée : les transactions cross-domain doivent être gouvernées par application services et événements outbox, pas par accès arbitraire aux tables.
- Les preuves hashées ne sont pas automatiquement des signatures légales.

## 7. QA, CI et Docker

### Preuves GitHub exact-head

Pour le SHA `7d19e216f660087b474588763cb722296ef37084`, GitHub expose les checks réussis suivants :

| Check              | État                        |
| ------------------ | --------------------------- |
| `verify`           | succès — run `32974374576`  |
| `smoke`            | succès — run `32974374803`  |
| `dependency-audit` | succès — run associé au SHA |
| Dependabot         | deux checks réussis         |

Le workflow principal inspecté installe avec lockfile, formate/valide/génère Prisma, applique les migrations, seed, typecheck, lint, tests unitaires, build, démarre API/Web, lance tests navigateur et de nombreux tests API E2E.

### Limites de preuve

- Les lignes `PASS` de `docs/PRODUCT_READINESS.md` citent des runs antérieurs à ce SHA ; elles ne doivent pas être utilisées comme preuve du HEAD actuel sans corrélation.
- `WEB_SURFACE_COVERAGE.md` classe Access Control `IMPLEMENTED_NOT_VERIFIED` sur un autre SHA ; la qualification matérielle ZX-S504 reste explicitement non vérifiée.
- Aucun budget Lighthouse, Web Vitals, taille de bundle ou test de charge n’a été identifié dans le gate principal inspecté.
- Le Dockerfile audité construit une image commune et son `CMD` démarre seulement le web ; Compose surcharge la commande pour l’API. AX-ERP360 doit produire des images runtime séparées, minimales et non-root.
- Les valeurs Compose de développement ne constituent pas une configuration de production.

## 8. Décisions de réutilisation

### À conserver conceptuellement

- TypeScript strict, pnpm workspace, Next.js, NestJS, Prisma/PostgreSQL.
- Monolithe modulaire, API propriétaire des règles et contrôles serveur.
- Session opaque, RBAC, audit, isolation tenant, Decimal, unités explicites.
- Ledgers append-only, idempotence, transitions explicites et provenance.
- Tests API E2E par verticale et tests navigateur sur workspaces critiques.

### À reconstruire, pas copier mécaniquement

- Shell, navigation et système CSS.
- Package UI et Data Grid.
- Découpage du schéma Prisma et contrats inter-domaines.
- Gates CI en jobs parallèles avec budgets non fonctionnels.
- Images Docker runtime.
- Matrice de readiness par module.

## 9. Risques de migration

1. Importer les claims de « readiness » sans leurs limites verticales.
2. Copier un schéma fragmenté sans cartographier toutes les migrations SQL.
3. Réintroduire des routes authentifiées sans permission explicite.
4. Confondre facture/paiement opérationnels avec comptabilité légale.
5. Confondre registre BIM avec moteur IFC/BIM.
6. Confondre activité commissioning exécutée avec acceptation contractuelle.
7. Confondre hash/signature fournisseur-neutre avec preuve légale qualifiée.
8. Présenter Smart Building comme BMS sans protocoles et contrôles terrain qualifiés.

## 10. Conclusion

AXORA ERP3602 est une référence riche et réellement implémentée sur de nombreuses tranches verticales. Son principal apport pour AX-ERP360 est un ensemble d’invariants métier et de sécurité, pas son interface ni l’ensemble de ses affirmations de complétude. La nouvelle application doit repartir d’un socle propre, aligner les dépendances, imposer une policy d’autorisation réellement deny-by-default, consolider le Design System, formaliser les frontières de domaine et rattacher chaque statut de readiness à une preuve exacte du SHA évalué.

Hypothèses — L’audit porte sur le SHA et les fichiers listés ; les services externes et matériels n’ont pas été contrôlés.

Limites — Inspection statique et preuves GitHub ; la suite complète de la source n’a pas été réexécutée localement.

Niveau de confiance — Élevé sur l’inventaire et les capacités observées ; moyen sur la qualification fonctionnelle exhaustive de chaque domaine.
