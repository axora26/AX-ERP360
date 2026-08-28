# Données AX-ERP360

## Technologie

- PostgreSQL 18 pour le socle qualifié.
- Prisma `7.9.1` aligné pour CLI, client et adapter.
- Migrations immuables après application partagée.

## Conventions

- UUID ou identifiant opaque stable.
- `organizationId` obligatoire pour les objets tenant-scoped.
- `companyId` obligatoire pour les objets company-scoped.
- UTC en base ; timezone utilisateur uniquement à l’affichage.
- Decimal pour argent, quantités et mesures exactes.
- Code devise ISO explicite ; unité explicite.
- Soft delete uniquement avec justification ; les écritures financières/audit utilisent reversal ou état terminal.
- Contraintes uniques et index commencent par le scope tenant lorsque pertinent.

## Transactions

- Commande métier = transaction atomique.
- Numérotation et cumul critiques protégés contre la concurrence.
- Idempotency key unique dans le scope métier.
- Outbox dans la même transaction que l’agrégat.

## Migrations

1. Prisma format et validate.
2. Génération client.
3. Migration sur base PostgreSQL propre.
4. Migration sur snapshot représentatif.
5. Test de rollback logique ou procédure de forward-fix.
6. Vérification des index et contraintes.
7. Sauvegarde/restauration avant promotion production.

## Performance

Chaque index doit référencer une requête ou un invariant. Pour les requêtes critiques : volume de fixture, plan `EXPLAIN (ANALYZE, BUFFERS)`, latence et cardinalité avant/après.

## Sauvegarde

La stratégie RPO/RTO, chiffrement, rétention et test de restauration est BLOCKED jusqu’à définition de l’environnement de production.
