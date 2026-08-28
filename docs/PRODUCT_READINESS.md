# Product Readiness AX-ERP360

## États autorisés

- `PASS` — preuve exécutée sur le SHA exact.
- `PARTIAL` — certains éléments sont prouvés, d’autres manquent.
- `FAIL` — contrôle exécuté en échec.
- `BLOCKED` — dépendance externe ou décision requise empêche le contrôle.
- `NOT TESTED` — implémenté mais contrôle non exécuté.
- `NOT VERIFIED` — preuve absente ou non rattachable au SHA courant.

## Matrice initiale

Le dépôt cible ne possède encore aucun incrément applicatif qualifié. Aucun `PASS` n’est donc attribué.

| Module                         | UI           | Responsive | Business rules | API          | Database     | Validation   | RBAC         | Audit        | Tests      | Error states | Documentation |
| ------------------------------ | ------------ | ---------- | -------------- | ------------ | ------------ | ------------ | ------------ | ------------ | ---------- | ------------ | ------------- |
| Platform / Identity            | NOT VERIFIED | NOT TESTED | NOT VERIFIED   | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT TESTED | NOT TESTED   | PARTIAL       |
| Command Center                 | NOT VERIFIED | NOT TESTED | NOT VERIFIED   | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT TESTED | NOT TESTED   | PARTIAL       |
| CRM                            | NOT VERIFIED | NOT TESTED | NOT VERIFIED   | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT TESTED | NOT TESTED   | PARTIAL       |
| Projects / Cost Control        | NOT VERIFIED | NOT TESTED | NOT VERIFIED   | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT TESTED | NOT TESTED   | PARTIAL       |
| Procurement / Inventory        | NOT VERIFIED | NOT TESTED | NOT VERIFIED   | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT TESTED | NOT TESTED   | PARTIAL       |
| Finance                        | NOT VERIFIED | NOT TESTED | NOT VERIFIED   | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT TESTED | NOT TESTED   | PARTIAL       |
| HR / Payroll                   | NOT VERIFIED | NOT TESTED | NOT VERIFIED   | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT TESTED | NOT TESTED   | PARTIAL       |
| GED / QHSE                     | NOT VERIFIED | NOT TESTED | NOT VERIFIED   | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT TESTED | NOT TESTED   | PARTIAL       |
| MEP / BIM / Commissioning      | NOT VERIFIED | NOT TESTED | NOT VERIFIED   | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT TESTED | NOT TESTED   | PARTIAL       |
| Assets / GMAO / Smart Building | NOT VERIFIED | NOT TESTED | NOT VERIFIED   | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT TESTED | NOT TESTED   | PARTIAL       |

## Registre de preuve

Chaque évolution de statut doit indiquer : SHA, commande ou workflow, run ID/URL, date, environnement et limites. Un workflow ancien ne qualifie jamais un commit plus récent.
