# Landing page — Revenus en ligne sans produit

Landing page statique orientée **conversion**, pour promouvoir une méthode d’affiliation (plateforme **Chariow**). Public cible : Afrique francophone, mobile-first, ton rassurant (légitimité, pas d’arnaque).

## Aperçu technique

| Élément | Détail |
|--------|--------|
| **Stack** | HTML5, CSS3, jQuery 3 |
| **Police** | System UI (pas de build) |
| **Couleur principale** | `#ffcc00` |
| **Paiement** | Widget Chariow (Snap) — chargement via CDN |

Aucun bundler ni Node requis pour servir la page : des fichiers statiques suffisent.

## Structure du projet

```
revenus-en-ligne-sans-produit/
├── index.html      # Contenu, SEO, widget Chariow, preloader
├── styles.css      # Mise en page, header responsive, animations
├── main.js         # Menu mobile, preloader, widget Chariow, fade-in au scroll
├── img/
│   └── proof.png   # Visuel hero + section « Preuve de résultats »
└── README.md
```

## Démarrage local

**Option 1 — ouvrir le fichier**  
Double-cliquer sur `index.html` (certains navigateurs limitent les scripts ou le chargement CDN en `file://` — préférer un petit serveur).

**Option 2 — serveur HTTP (recommandé)**  
À la racine du projet :

```bash
# Python 3
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080/`.

Sous PowerShell, variante possible :

```powershell
npx --yes serve -p 8080
```

## Configuration à personnaliser

### SEO et partages sociaux

Dans `index.html`, adapter les URLs **HTTPS absolues** :

- `<link rel="canonical" …>`
- `og:url`, `og:image`
- `twitter:image`

Les valeurs actuelles pointent vers `https://boutique.kg-code.com/` — à remplacer par le domaine réel de la landing en production.

### Widget Chariow (paiement)

Le bloc `#chariow-widget` (bas de page) contient les attributs `data-*` (produit, boutique, couleurs, locale, etc.). Les boutons avec la classe **`js-chariow-checkout`** ouvrent le checkout via le script du widget (le bouton « tap » par défaut est masqué en CSS/JS).

Modifier produit / boutique depuis le tableau de bord Chariow (**Marketing → Snap**) puis recoller le code généré si besoin.

### Prix affiché au checkout (5 $ et non 23 $)

Le **prix n’est pas défini dans ce dépôt** : il vient du **produit Chariow** rattaché au widget (`data-product-id`, boutique `boutique.kg-code.com` dans `index.html`).

Pour que les visiteurs paient **5 $** au lieu de **23 $** :

1. Se connecter au **tableau de bord Chariow** de la boutique concernée.
2. Ouvrir le **produit** lié au Snap / au même `data-product-id` (catalogue, produits numériques, etc.).
3. Modifier le **prix de vente** (ex. passer de **23 $** à **5 $**) et **enregistrer**.

Après publication côté Chariow, le widget et la page de paiement afficheront automatiquement le nouveau montant — **aucune modification de `index.html` n’est nécessaire** pour le prix seul.

Sur la **landing** (`index.html`), le tarif **5 $ US** (et la mention « pas 23 $ ») est rappelé dans le **hero**, la section **solution**, le **CTA final**, la **barre sticky** mobile et la **FAQ**. Si tu changes le prix commercial, mets ces textes à jour pour rester cohérent.

### Images

- **`img/proof.png`** : utilisée dans le **hero** et la section **Preuve de résultats**. Remplacer le fichier en gardant le même nom, ou mettre à jour les `src` dans `index.html`.

### Logo header

Le logo Chariow est chargé depuis une URL externe (Gleap). Pour le changer, modifier la balise `<img class="site-header__brand-logo" …>` dans `index.html`.

## Fonctionnalités UX

- **Header sticky** avec menu burger **mobile**, overlay et panneau latéral.
- **Preloader** plein écran jusqu’à l’événement `load` (avec garde-fou temps max).
- **CTA sticky** en bas sur mobile (masqué quand le menu est ouvert).
- **Animations** d’apparition au scroll (sections `.fade-in`).
- **Meta** : description, Open Graph, Twitter Card, JSON-LD `WebPage`.

## Déploiement

Héberger le dossier sur n’importe quel hébergeur de fichiers statiques (Netlify, Vercel, GitHub Pages, Apache/Nginx, etc.). Vérifier en production :

1. HTTPS actif (pour le widget et les meta sociales).  
2. URLs canoniques et `og:image` cohérentes avec le domaine final.

## Licence

Projet interne / usage commercial selon vos droits sur les contenus et la marque Chariow.
