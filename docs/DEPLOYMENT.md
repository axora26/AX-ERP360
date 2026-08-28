# Déploiement AX-ERP360

## Topologie cible initiale

- Image `web` Next.js standalone, utilisateur non-root.
- Image `api` NestJS, utilisateur non-root.
- Job séparé de migration Prisma avant promotion.
- PostgreSQL managé ou opéré avec sauvegarde/restauration qualifiée.
- Reverse proxy/TLS hors conteneurs applicatifs.

## Environnements

- local ;
- CI éphémère ;
- staging ;
- production.

Les secrets sont injectés par l’environnement/secret manager, jamais par l’image ni le dépôt.

## Promotion

1. Build depuis un SHA propre.
2. SBOM et scan dépendances/image.
3. Tests et migrations sur staging.
4. Smoke health/readiness.
5. Sauvegarde et plan forward-fix.
6. Promotion de l’image immuable.
7. Vérification post-déploiement liée au SHA/image digest.

## Statut

Déploiement production : **NOT VERIFIED**. La topologie d’hébergement, les domaines, certificats, RPO/RTO et secret manager ne sont pas encore définis.
