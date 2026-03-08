# Audit GSAP – Dépendances payantes → migration gratuite

## Problème

Le repo utilise des plugins GSAP **Club** (payants ~150€/mois) via le package `gsap-trial`. En production, `gsap-trial` affiche une bannière du type :  
**"Oops! Trial version of GSAP deployed"** (voir https://gsap.com/requires-membership/).

---

## Dépendances payantes identifiées

| Fichier | Import | Plugin | Usage |
|---------|--------|--------|-------|
| `src/components/Navbar.tsx` | `gsap-trial/ScrollSmoother` | ScrollSmoother | Scroll fluide, wrapper `#smooth-wrapper` / `#smooth-content` |
| `src/components/utils/splitText.ts` | `gsap-trial/ScrollSmoother` | ScrollSmoother | Enregistrement du plugin |
| `src/components/utils/splitText.ts` | `gsap-trial/SplitText` | SplitText | Animation texte par mots/caractères (`.para`, `.title`) |
| `src/components/utils/initialFX.ts` | `gsap-trial/SplitText` | SplitText | Animations landing (chars, lines) |
| `src/components/Work.tsx` | `@gsap/react` | useGSAP | Hook React pour cleanup des timelines |

---

## Bonne nouvelle : GSAP 3.13+ est gratuit

Depuis la **v3.13** (sponsor Webflow), GSAP et tous les plugins (ScrollSmoother, SplitText, etc.) sont **gratuits** sur npm. Plus besoin de Club GSAP.

---

## Plan de migration

### 1. Mise à jour des dépendances

```json
// package.json
"gsap": "^3.13.0"   // ou supérieur (actuellement ^3.12.7)
"@gsap/react": "^2.1.1"  // gratuit, à ajouter si manquant
```

Supprimer : `gsap-trial` (ne plus l’utiliser).

### 2. Changement des imports

| Ancien | Nouveau |
|--------|---------|
| `gsap-trial/ScrollSmoother` | `gsap/ScrollSmoother` |
| `gsap-trial/SplitText` | `gsap/SplitText` |

### 3. Fichiers à modifier

| Fichier | Modifications |
|---------|---------------|
| **Navbar.tsx** | `import { ScrollSmoother } from "gsap/ScrollSmoother"` |
| **splitText.ts** | `import { ScrollSmoother } from "gsap/ScrollSmoother"` + `import { SplitText } from "gsap/SplitText"` |
| **initialFX.ts** | `import { SplitText } from "gsap/SplitText"` |
| **Work.tsx** | Garder `@gsap/react` (gratuit) ou remplacer `useGSAP` par `useEffect` |

### 4. Structure ScrollSmoother (Navbar + MainContainer)

Le projet repose sur une structure spécifique :

```html
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- contenu scrollable -->
  </div>
</div>
```

ScrollSmoother doit être créé avec `wrapper` et `content` correspondants. Aucun changement de structure nécessaire.

### 5. Chaîne d’appels

- **Navbar** : crée `smoother`, exporté vers `initialFX`
- **initialFX** : appelé après le loading, utilise `smoother.paused(false)`
- **splitText** : enregistre ScrollSmoother (pour compatibilité)

---

## Risques / points d’attention

1. **Version GSAP** : passer à 3.13+ pour avoir ScrollSmoother et SplitText dans le package principal.
2. **API SplitText 3.13** : réécriture majeure, vérifier que `.chars`, `.words`, `.lines` et `revert()` existent toujours.
3. **@gsap/react** : si tu préfères éviter cette dépendance, remplacer `useGSAP` par un `useEffect` avec cleanup dans `Work.tsx`.

---

## Résumé des actions

1. Mettre à jour `gsap` vers `^3.13.0` (ou dernière version).
2. Ajouter `@gsap/react` si `Work.tsx` l’utilise.
3. Remplacer tous les imports `gsap-trial/*` par `gsap/*`.
4. Supprimer `gsap-trial` du `package.json` s’il est encore présent.
5. Lancer `npm install` puis `npm run build` pour valider.
