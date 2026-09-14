# BAMBA CLT — Site web

Site vitrine de **BAMBA CLT IMMO SARL** — Immobilier, BTP & Logistique (Conakry, Guinée).

> « La Guinée connectée en toute confiance »

## Aperçu

Site statique multi-pages, responsive, rapide et sans dépendance de build.

| Page | Fichier | Contenu |
|------|---------|---------|
| Accueil | `index.html` | Hero, pôles d'activité, services, chiffres, croissance, témoignages, CTA |
| Services | `services.html` | Détail BTP / Immobilier & Logistique, flotte, infrastructure |
| À propos | `a-propos.html` | Vision, valeurs, marché, stratégie |
| Contact | `contact.html` | Coordonnées + formulaire de devis, WhatsApp |

## Structure

```
.
├── index.html
├── services.html
├── a-propos.html
├── contact.html
├── README.md
└── assets/
    ├── css/style.css     # Design system (palette bleu marine + or)
    ├── js/main.js        # Nav, animations au scroll, compteurs, graphique, formulaire
    └── img/logo.png      # Logo BAMBA CLT
```

## Lancer en local

Aucun outil requis. Ouvrez `index.html` dans un navigateur, ou servez le dossier :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Photos

Le site est **photo-led** : hero, pôles, galerie de réalisations et pages
Services/À propos utilisent de vraies photographies (contexte BTP & logistique).

- Les images s'affichent automatiquement : le site tente d'abord un fichier
  **local** (`assets/img/photos/<nom>.png`), puis bascule sur le **CDN** si le
  fichier n'est pas encore présent.
- Pour **auto-héberger** les photos (recommandé en production), lancez une fois :

  ```bash
  bash download-assets.sh
  ```

  Les images seront téléchargées dans `assets/img/photos/` ; committez-les.
- Pour remplacer une photo par la vôtre, déposez simplement un fichier PNG du
  même nom dans `assets/img/photos/` (ex. `hero.png`, `logistique.png`).

Noms utilisés : `hero`, `construction`, `logistique`, `frigo`, `entrepot`,
`projet-immeuble`, `projet-terrassement`, `projet-materiaux`, `equipe`.

## Personnalisation

- **Couleurs & typographie** : variables CSS en haut de `assets/css/style.css` (`:root`).
- **Coordonnées** : téléphones, email et adresse dans le `<footer>` et sur `contact.html`.
- **Formulaire de devis** : envoi géré côté front (démo). Pour recevoir les demandes par email,
  connecter le `<form id="devis-form">` à un service (Formspree, Netlify Forms, ou un backend).

## Design

- Palette : bleu marine profond `#0b2138` + or/bronze `#c79a54` (issue du logo).
- Polices : Sora (titres) & Inter (texte) via Google Fonts.
- Accessibilité : contrastes soignés, `prefers-reduced-motion` respecté, navigation clavier.

---

Développé pour BAMBA CLT IMMO SARL.
