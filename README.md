# Calculatrice TDD

Projet de formation : calculatrice développée avec une approche TDD (Test Driven Development)  
Ce projet permet d’effectuer des opérations de base (addition, soustraction, multiplication) avec une fonctionnalité d’historique.

---

## Fonctionnalités

- Calculs d’addition, soustraction, multiplication
- Historique des calculs affiché à l’écran
- Suppression de l’historique
- Interface utilisateur simple et intuitive

---

## Technologies utilisées

- **JavaScript / TypeScript**
- **Vitest** : tests unitaires
- **Playwright** : tests end-to-end
- **ESLint** : vérification de la qualité du code
- **GitHub Actions** : intégration et déploiement continus (CI/CD)
- **GitHub Pages** : hébergement de la version déployée

---

## Installation

1. Cloner le dépôt
```bash
git clone https://github.com/tsavou/ma-calculatrice-TDD.git
cd ma-calculatrice-TDD
```

2.	Installer les dépendances
```bash
npm install
```

### Lancer l'application
```bash
npm run dev
```

### Lancer les tests
```bash
npm run test
```

### Lancer les tests end-to-end
```bash
npx playwright test
```

### Lancer ESLint
```bash
npm run lint
```

### Intégration continue / Déploiement continu (CI/CD)
Le projet utilise GitHub Actions pour automatiser :
•	L’exécution des tests unitaires et end-to-end à chaque push ou pull request
•	La vérification de la qualité du code avec ESLint
•	Le déploiement automatique sur GitHub Pages à chaque push sur la branche main

### Déploiement
La version déployée de l'application est disponible sur GitHub Pages : [Lien vers la version déployée](https://tsavou.github.io/ma-calculatrice-TDD/)