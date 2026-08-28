# Stratégie de tests AX-ERP360

## Pyramide

- Unitaires : value objects, policies, calculs et state machines.
- Intégration : repositories, contraintes PostgreSQL, transactions et outbox.
- API E2E : workflows, erreurs, idempotence, concurrence, RBAC et tenant.
- Web E2E : chemins critiques, clavier, responsive, états et permissions.
- Contract : OpenAPI, événements, fixtures et imports/exports.

## TDD

Toute nouvelle règle ou correction suit RED → GREEN → REFACTOR : test en échec observé, code minimal, test ciblé réussi, puis suite complète.

## Viewports obligatoires

`360`, `390`, `430`, `768`, `1024`, `1280`, `1440`, `1920` px.

À vérifier : absence de scroll horizontal involontaire, navigation, Data Grid adaptatif, formulaires, dialogues, actions ≥44 px sur mobile.

## Accessibilité

- Navigation clavier complète.
- Focus visible et ordre logique.
- Landmarks, labels, noms accessibles.
- Contraste WCAG AA.
- Réduction de mouvement.
- Messages d’erreur associés aux champs.
- Tests axe/playwright plus revue manuelle ciblée.

## Performance

- Budgets bundle par route.
- Web Vitals synthétiques sur shell et Command Center.
- Tests API avec dataset représentatif.
- Détection de requêtes N+1.
- Aucun claim d’optimisation sans mesure avant/après.

## Gate minimal par incrément

1. format ;
2. Prisma format/validate/generate ;
3. typecheck ;
4. lint ;
5. unit ;
6. intégration concernée ;
7. E2E concerné ;
8. build ;
9. responsive/a11y si UI ;
10. sécurité/RBAC si endpoint ou donnée.
