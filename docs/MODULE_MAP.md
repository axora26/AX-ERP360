# Carte des modules AX-ERP360

| Groupe       | Modules                                                                | Autorité cible                                 |
| ------------ | ---------------------------------------------------------------------- | ---------------------------------------------- |
| Command      | Command Center, Analytics, Notifications, Tasks, AI                    | projections contrôlées et liens vers workflows |
| Commercial   | CRM, Clients, Studies, BOQ, DQE, BPU, Quotes, Contracts                | Commercial context                             |
| Supply Chain | Fournisseurs, RFQ, Achats, Approvisionnements, Stocks, Logistique      | Supply Chain context                           |
| Delivery     | Projets, WBS/CBS, Construction, Cost Control, Planning, Sous-traitants | Project Delivery context                       |
| Finance      | Facturation, AR/AP, Dépenses, Trésorerie, Comptabilité de gestion      | Finance context                                |
| People       | RH, Présence, Paie, Compétences                                        | People context                                 |
| Information  | GED, RFI, Transmittals, Submittals                                     | Information Management context                 |
| Quality      | QA/QC, HSE, Commissioning                                              | Quality & Handover context                     |
| Engineering  | MEP, BIM/IFC                                                           | Engineering context                            |
| Operations   | Équipements, Assets, GMAO, Field Service                               | Operations context                             |
| Connected    | Smart Building, IoT, Energy, Automation                                | Connected Building context                     |
| Platform     | Administration, Paramètres, Identity, Tenant, RBAC, Audit              | Platform context                               |

## Chaîne équipement transversale

```text
Objet BIM/IFC
→ Type produit
→ Équipement projet
→ Consultation / achat
→ Réception / stock
→ Installation
→ Commissioning
→ Actif
→ Plan / ordre de maintenance
→ Point IoT / compteur
```

Chaque transition conserve sa provenance ; une étape n’infère pas la suivante sans acte métier explicite.

## Contrats de disponibilité UI

- **Disponible** : route et actions réellement fonctionnelles.
- **Lecture seule** : affichage fonctionnel, mutations absentes ou interdites explicitement.
- **À venir** : destination visible mais étiquetée et sans contrôle factice.
- **Indisponible** : contrôle désactivé avec raison accessible.
