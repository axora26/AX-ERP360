# RBAC AX-ERP360

RBAC signifie Role-Based Access Control, contrôle d’accès basé sur les rôles.

## Modèle

```text
User
→ Membership (Organization)
→ Company assignment
→ Role assignment (organization ou company)
→ Permission grants
→ Server policy evaluation
```

## Convention de permission

`<domain>.<resource>.<action>`

Exemples :

- `crm.account.read`
- `project.budget.approve`
- `procurement.purchase-order.issue`
- `finance.payment.post`
- `security.role.manage`

## Règles

- Refus par défaut.
- Permission explicite sur chaque endpoint non public.
- Scope organisation et société vérifié après authentification.
- `read`, `manage`, `approve`, `post`, `close`, `admin` séparés.
- L’auteur ne peut pas approuver son propre objet lorsque la séparation des tâches s’applique.
- Les permissions de sécurité et délégation restent organisationnelles et non assignables au niveau société sans décision explicite.
- Les super-rôles ne contournent pas les invariants de scope ou les états terminaux.

## Rôles de départ

Les rôles sont des presets modifiables, pas des règles codées en dur :

- Organization Owner
- Security Administrator
- Company Administrator
- Executive
- Project Manager
- Project Controller
- Procurement Officer
- Storekeeper
- Finance Officer
- HR Officer
- QHSE Officer
- Engineer / BIM Coordinator
- Maintenance Planner
- Read Only Auditor

## Tests obligatoires

Pour chaque commande :

1. anonyme → 401 ;
2. authentifié sans policy/grant → 403 ;
3. grant correct, mauvais tenant → réponse non révélatrice ;
4. grant correct, bonne société → résultat attendu ;
5. statut métier incompatible → conflit explicite ;
6. audit succès/échec selon classification.
