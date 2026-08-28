# API AX-ERP360

## Contrat

- REST JSON sous `/api/v1`.
- OpenAPI généré depuis le code et vérifié en CI.
- Problem Details pour erreurs.
- Validation stricte avec champs inconnus refusés.
- Dates ISO 8601 UTC ; Decimal transmis en chaîne.

## Endpoints

- Collections : `GET /projects`, `POST /projects`.
- Ressource : `GET /projects/{id}`.
- Transition : `POST /projects/{id}:close`.
- Recherche globale : endpoint dédié, limité et permission-aware.
- Health : `/health/live`, `/health/ready`.

## Pagination

- Curseur opaque pour grands volumes.
- `limit` borné côté serveur.
- Tri allowlisté.
- Filtres typés.
- Réponse contenant `items` et `nextCursor`, sans total coûteux par défaut.

## Idempotence

Les commandes rejouables acceptent `Idempotency-Key`. Même clé et même payload renvoient le même résultat ; même clé et payload différent renvoient un conflit.

## Versioning

- Breaking change : nouvelle version majeure de route ou période de compatibilité documentée.
- Événements et DTO possèdent une version de schéma lorsque persistés ou publiés.
