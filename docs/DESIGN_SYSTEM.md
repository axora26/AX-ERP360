# Design System AX-ERP360

## Positionnement

**Surface primaire : Monitor. Surface secondaire : Operate.**

Le système doit donner l’impression : ERP industriel + SaaS premium + Project Control + Construction Technology + Smart Building Platform. Il ne doit jamais utiliser la composition d’une page marketing dans un écran opérationnel.

## Identité

- Entreprise : AXORA GROUP SARLU.
- Produit : AX-ERP360.
- Signature : « Maîtriser la technique. Transformer l’avenir. »
- Titres : Montserrat avec fallback Inter/system.
- Contenu : Inter avec fallback system.

## Palette

| Token           | Light     | Dark      | Usage                     |
| --------------- | --------- | --------- | ------------------------- |
| Canvas          | `#F4F6F9` | `#0B1120` | fond principal            |
| Surface         | `#FFFFFF` | `#111827` | panneaux et contrôles     |
| Surface subtle  | `#EEF2F7` | `#182235` | sélection et regroupement |
| Text            | `#111827` | `#F8FAFC` | contenu principal         |
| Muted           | `#5D6675` | `#BFC3C9` | secondaire accessible     |
| Border          | `#D5DAE1` | `#334155` | séparation                |
| Deep Blue       | `#1E3A8A` | `#8CB4FF` | autorité, navigation      |
| Technology Blue | `#2563EB` | `#60A5FA` | action, focus             |
| Success         | `#08783E` | `#58D68D` | réussite factuelle        |
| Warning         | `#8A5B00` | `#F6C453` | attention                 |
| Danger          | `#B42318` | `#FF8A80` | erreur, blocage           |

La couleur sémantique est accompagnée d’un label/icone accessible. Aucun KPI n’est coloré uniquement pour décorer.

## Typographie

| Style   | Taille | Poids | Usage                          |
| ------- | -----: | ----: | ------------------------------ |
| Display |  32 px |   700 | titres rares du Command Center |
| Title L |  24 px |   700 | titre de page                  |
| Title M |  18 px |   650 | section/panneau                |
| Body M  |  15 px |   400 | contenu/formulaire             |
| Body S  |  13 px |   400 | table dense/métadonnée         |
| Label   |  12 px |   650 | labels et statuts              |
| Data    |  14 px |   600 | nombres et cellules clés       |

Les données numériques utilisent `font-variant-numeric: tabular-nums` et s’alignent à droite.

## Espacement

Échelle : `4, 8, 12, 16, 24, 32, 48, 64` px. La densité par défaut est compacte, avec option confortable pour Data Grid. Les grandes zones vides sont justifiées par une tâche ou un état, jamais par une esthétique marketing.

## Radius, bordures et elevation

- Radius : 4 px micro, 8 px contrôle, 12 px panneau, 16 px dialogue exceptionnel.
- Bordure standard : 1 px.
- Ombre uniquement pour overlays, menus et dialogues.
- Pas de glassmorphism ni de blur dans le workspace.
- Aucun gradient décoratif dans les surfaces opérationnelles.

## Breakpoints et comportement

|   Largeur | Mode                                                           |
| --------: | -------------------------------------------------------------- |
|     0–479 | téléphone compact, drawer, actions 44 px, listes/cartes        |
|   480–767 | téléphone large, deux colonnes seulement si lisibles           |
|  768–1023 | tablette, rail compact, panneaux adaptatifs                    |
| 1024–1279 | desktop compact, sidebar réductible                            |
| 1280–1599 | desktop standard                                               |
|     ≥1600 | desktop large, densité conservée, largeur de lecture contrôlée |

Viewports de test obligatoires : 360, 390, 430, 768, 1024, 1280, 1440 et 1920 px.

## Shell

### Desktop

- Sidebar 272 px étendue / 72 px réduite.
- Logo, produit, favoris puis modules groupés par flux métier.
- Topbar 56 px : recherche, société, projet, raccourcis, notifications, aide, profil.
- Breadcrumb et titre dans le workspace, pas dans une énorme hero card.
- Contexte société/projet toujours visible et accessible au clavier.

### Tablette

- Rail 64–72 px ou drawer persistant selon largeur.
- Panneaux secondaires dans un inspector/drawer.
- Data Grid conserve colonnes prioritaires et déplace le reste dans le détail.

### Mobile

- App bar compacte et drawer.
- Barre d’actions principales proche du pouce.
- Tables transformées en lignes structurées ou cartes, avec détail progressif.
- Filtres en sheet plein écran.
- Formulaires en une colonne, clavier et type d’entrée adaptés.
- Aucun scroll horizontal involontaire.

## Navigation et command palette

- Groupes : Command, Commercial, Delivery, Supply Chain, Finance, People, Information, Engineering/Quality, Operations, Connected, Platform.
- Favoris utilisateur.
- Recherche globale permission-aware.
- Command palette au clavier, résultats par type et contexte, jamais d’action non autorisée.
- Modules non prêts : badge « À venir » et destination désactivée ou page explicative.

## Boutons

- Primary : une action dominante par zone.
- Secondary : action sûre alternative.
- Ghost : outils locaux.
- Danger : confirmation avec conséquence explicite.
- Disabled : raison accessible via texte ou description.
- Loading : conserve largeur et annonce l’état.
- Mobile : cible ≥44×44 px.

## Inputs et formulaires

- Label toujours visible ; placeholder non utilisé comme label.
- Aide et unité adjacentes.
- Erreur sous le champ, liée par `aria-describedby`.
- Résumé d’erreurs au début pour formulaires longs.
- Champs monétaires : devise explicite ; pas de conversion silencieuse.
- Auto-save uniquement si état et reprise sont clairs.
- Actions sticky pour formulaires longs sur mobile.

## Cards et panneaux

Un panneau regroupe une tâche ou une autorité de données. Éviter les cards imbriquées. Les KPI sont compacts, avec définition, période, contexte et provenance. Aucun nombre fictif ne ressemble à une donnée de production.

## Data Grid professionnel

Capacités par opt-in :

- pagination serveur ;
- tri et filtres typés ;
- recherche ;
- visibilité/réordonnancement des colonnes ;
- vues sauvegardées ;
- sélection et actions bulk permission-aware ;
- export audité ;
- navigation clavier ;
- sticky header ;
- densité compact/confortable ;
- loading skeleton, empty, error et partial data ;
- virtualisation uniquement après mesure.

Responsive : colonnes prioritaires, row detail, liste structurée mobile. Ne jamais réduire toutes les colonnes jusqu’à l’illisibilité.

## Dialogs, dropdowns, tabs, accordions

- Dialog pour décision courte ; page dédiée pour workflow complexe.
- Focus trap, Escape, retour du focus.
- Confirmation destructive nomme l’objet et la conséquence.
- Tabs pour vues sœurs, pas pour masquer un processus séquentiel.
- Accordion pour détail secondaire seulement.
- Dropdown avec recherche à partir d’un volume justifié et chargement serveur si nécessaire.

## Charts

- Un graphique répond à une question métier.
- Axes, unité, période et source visibles.
- Palette compatible daltonisme ; patterns/labels lorsque requis.
- Table de données accessible.
- Pas de 3D, donut décoratif ou animation permanente.

## États

- **Loading** : skeleton structurel, `aria-busy`, pas de faux contenu.
- **Empty** : explique pourquoi et propose une action autorisée.
- **Error** : message non technique, request ID, retry sûr.
- **Permission denied** : distinct d’empty et de missing context.
- **Missing context** : demande société/projet.
- **Partial/stale** : affiche la date, la source et la limitation.
- **Offline chantier** : file d’attente, dernier sync et conflits explicites.

## Accessibilité

- WCAG 2.2 AA comme objectif.
- Focus visible 2 px minimum avec contraste.
- Skip links et landmarks.
- Noms accessibles pour icônes et boutons.
- Ordre DOM identique à l’ordre visuel.
- `prefers-reduced-motion`.
- Pas de changement de contexte inattendu.
- Cibles tactiles 44 px.

## Slop audit de la cible

Objectif : **0/10** sur les tells compositionnels.

Interdits : tech gradient, indigo générique non brandé, feature-tile grid, accent rail, blur sans profondeur, monument stat, icon topper, center stack, typo par défaut sans choix, mauvaise surface. Le bleu AXORA est brandé mais reste fonctionnel, non décoratif.

## Critère de vérité

Tout contrôle visible est : fonctionnel, désactivé avec raison, ou marqué « À venir ». Les fixtures portent une bannière « Données de démonstration » et ne sont jamais mélangées à une source réelle.
