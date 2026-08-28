# Périmètre produit AX-ERP360

## Proposition de valeur

AX-ERP360 relie les décisions de direction, la chaîne commerciale, les projets de construction, les achats, les coûts, les finances opérationnelles, les personnes, l’ingénierie, la qualité, les actifs et les bâtiments connectés.

La surface principale est un **Command Center Monitor/Operate** : montrer ce qui exige une décision et permettre d’accéder directement au workflow autorisé.

## Vagues

### Vague 1 — Fondation

- Architecture et contrats.
- Design System.
- Login, session, société active, projet actif.
- Shell responsive.
- RBAC fail-closed et audit.
- CI/CD, Docker et preuves de readiness.

### Vague 2 — Command Center

- KPI basés sur données réelles ou fixtures explicitement « Démonstration ».
- Alertes, décisions, tâches et anomalies.
- Recherche globale, notifications, favoris et command palette.
- Référentiels société/projet.

### Vague 3 — Cœur ERP

- CRM et clients.
- Projets, WBS/CBS et Cost Control.
- BOQ/DQE/BPU.
- Achats, fournisseurs, approvisionnements, stocks et logistique.
- Finance opérationnelle et facturation.

### Vague 4 — People, chantier et information

- RH, présence et paie neutre puis localisation autorisée.
- Chantier, journaux, avancement et sous-traitants.
- GED/CDE, RFI, submittals et transmittals.
- QHSE.

### Vague 5 — Ingénierie et opérations

- MEP et construction.
- BIM/IFC avec provenance.
- Commissioning et handover.
- Assets, GMAO et Field Service.

### Vague 6 — Connected & Intelligence

- Smart Building, IoT et Energy Management.
- Analytics.
- Automation.
- Intelligence artificielle avec preuves, garde-fous et validation humaine.

## Non-objectifs initiaux

- Microservices prématurés.
- Comptabilité légale ou paie juridictionnelle non qualifiée.
- Certification réglementaire implicite.
- Moteur BIM/IFC déclaré complet avant parsing, visualisation et tests réels.
- Contrôle BMS/terrain sans protocole et banc matériel qualifiés.
- IA autonome prenant des décisions contractuelles, financières ou HSE sans validation humaine.

## Définition de terminé

Un incrément est terminé uniquement si les éléments applicables sont prouvés : UI, responsive, règles métier, API, données, validation, RBAC, audit, tests, états loading/empty/error et documentation. Les statuts autorisés sont ceux de `PRODUCT_READINESS.md`.
