# Sécurité AX-ERP360

## Posture

- Deny-by-default.
- Moindre privilège.
- Autorisation côté serveur.
- Isolation tenant/société.
- Validation stricte.
- Audit des actions sensibles.
- Aucun secret dans le dépôt.

## Authentification

- Sessions opaques à haute entropie ; seul le hash est stocké.
- Cookie `HttpOnly`, `SameSite` approprié et `Secure` en production.
- Rotation/révocation de sessions et expiration absolue.
- Hash de mot de passe memory-hard qualifié.
- Rate limiting du login par identité et adresse réseau, sans fuite d’existence.
- MFA TOTP pour rôles sensibles lorsque le stockage chiffré est configuré.
- Changement de mot de passe révoquant les autres sessions.

## Autorisation

Tout endpoint est dans un des deux états :

1. `public` explicitement ;
2. protégé par une policy/permission explicite.

Un endpoint authentifié sans metadata de policy est refusé au démarrage ou à l’exécution. L’UI peut masquer une action, mais ce masquage n’accorde ni ne retire un droit.

## Isolation tenant

- Organisation/société dérivées de la session.
- DTO ne peut pas choisir l’autorité de scope.
- Repositories imposent le scope.
- Clés étrangères composites et index de scope.
- Erreurs cross-tenant non révélatrices.
- Tests systématiques : même société, autre société, autre organisation.

## Entrées et sorties

- Validation avec allowlist et rejet des champs inconnus.
- Limites de taille, type MIME et antivirus pour fichiers.
- Noms de fichiers et chemins non fiables.
- Encodage de sortie et interdiction HTML non assaini.
- Requêtes SQL paramétrées ; raw SQL justifié et testé.

## Audit

- Qui, quand, organisation, société, action, ressource, résultat, requestId.
- Métadonnées minimales, pas de mot de passe, token, cookie ou donnée biométrique brute.
- Append-only avec contrôles DB sur UPDATE/DELETE.
- Horodatage UTC et politique de rétention à définir.

## Menaces prioritaires

1. IDOR / accès cross-tenant.
2. Endpoint oublié sans policy.
3. Escalade de rôle et délégation excessive.
4. CSRF/origin abuse sur mutations cookie-authenticated.
5. Upload malveillant GED/BIM.
6. Injection SQL/commande/template.
7. Secret dans log, CI ou bundle web.
8. Sur-partage dans exports et notifications.
9. Rejeu d’une commande financière ou stock.
10. Actions IA non autorisées ou non auditables.

## Gates

- Tests unitaires des policies.
- E2E tenant/RBAC pour chaque endpoint.
- Scan secrets et dépendances.
- SAST ciblé.
- DAST préproduction lorsque l’application est exécutable.
- Revue obligatoire Agent 07 sur tout changement de sécurité.
