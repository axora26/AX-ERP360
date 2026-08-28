# Qualification des modèles IA — 28 août 2026

## Méthode

Un modèle est distingué selon trois niveaux :

1. **Déclaré** : visible dans la configuration ou l’API locale du provider.
2. **Accessible** : le provider accepte la requête.
3. **Requête réelle réussie** : Hermes a renvoyé le texte exact demandé.

Les requêtes ci-dessous valident la disponibilité minimale, pas la qualité comparative. Aucun benchmark de code, de raisonnement long, d’UX ou de sécurité n’a encore été exécuté. Les affectations de capacité sont donc une **recommandation de routage**, et non un classement scientifique.

## Résultats vérifiés

Contrôle OmniRoute réexécuté le 28 août 2026 avec Hermes CLI : les trois requêtes ont renvoyé exactement les chaînes attendues, chacune avec un code de sortie `0`.

| Provider       | Modèle demandé         | Déclaré / route | Requête réelle | Résultat                                                     |
| -------------- | ---------------------- | --------------: | -------------: | ------------------------------------------------------------ |
| OmniRoute      | `auto/claude-sonnet`   |             oui |            oui | texte exact `OMNIROUTE_OK`, exit 0                           |
| OmniRoute      | `auto/best-coding`     |             oui |            oui | texte exact `CODING_OK`, exit 0                              |
| OmniRoute      | `auto/best-reasoning`  |             oui |            oui | texte exact `REASONING_OK`, exit 0                           |
| GitHub Copilot | `claude-sonnet-4.6`    |             oui |            oui | texte exact `COPILOT_SONNET_OK`, exit 0                      |
| GitHub Copilot | `gpt-5.4`              |             oui |            oui | texte exact `COPILOT_GPT_OK`, exit 0                         |
| LM Studio      | `openai/gpt-oss-20b`   |             oui |            oui | texte exact `LMSTUDIO_GPT_OK`, exit 0                        |
| LM Studio      | `qwen/qwen3-coder-30b` |             oui |            non | refus Hermes : fenêtre déclarée 8 192 tokens, minimum 64 000 |

## Affectation recommandée

| Agent | Rôle                                   | Route prioritaire                                                 | Motif fonctionnel                              |
| ----: | -------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------- |
|    01 | Orchestrateur / Principal Architect    | `omniroute:auto/best-reasoning`                                   | arbitrage, dépendances et cohérence globale    |
|    02 | Software & Enterprise Architect        | `omniroute:auto/best-reasoning`                                   | architecture et décisions complexes            |
|    03 | UX/UI & Design System                  | `omniroute:auto/claude-sonnet`                                    | conception produit et revue UX                 |
|    04 | Frontend Lead                          | `omniroute:auto/best-coding`                                      | TypeScript, React, Next.js                     |
|    05 | ERP Functional Modules Lead            | `omniroute:auto/best-reasoning`                                   | règles métier et priorisation fonctionnelle    |
|    06 | Backend / API Lead                     | `omniroute:auto/best-coding`                                      | NestJS, transactions et contrats API           |
|    07 | Data / Security / RBAC Lead            | `copilot:gpt-5.4`, secours `omniroute:auto/best-reasoning`        | revue critique indépendante et sécurité        |
|    08 | MEP / BIM / Construction Lead          | `omniroute:auto/best-reasoning`                                   | domaines techniques et non-inférence normative |
|    09 | QA / Performance / Accessibility       | `copilot:claude-sonnet-4.6`, secours `omniroute:auto/best-coding` | revue croisée et génération de tests           |
|    10 | DevOps / GitHub / Independent Reviewer | `copilot:gpt-5.4`, secours `omniroute:auto/best-reasoning`        | indépendance de provider pour la revue         |

LM Studio `openai/gpt-oss-20b` reste une option locale pour génération répétitive non critique. `qwen/qwen3-coder-30b` est **BLOCKED** tant que le provider ne déclare pas une fenêtre de contexte compatible avec Hermes.

## Limites

- Les tests étaient des requêtes exactes très courtes.
- Le modèle réellement choisi derrière une route `auto/*` demeure sous la responsabilité d’OmniRoute.
- La latence, le taux de succès sur tâches longues et la qualité n’ont pas été benchmarkés.
- La délégation Hermes de cette session route les sous-agents en `auto/smart`; les affectations ci-dessus décrivent la politique cible et les exécutions externes possibles.
