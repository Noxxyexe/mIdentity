# 🌐 mIdentity

**mIdentity** est un script FiveM (ESX) moderne, simple et efficace pour la **création d'identité des joueurs** lors de leur première connexion. Il s'inscrit dans une logique d'immersion RP et d'ergonomie, avec une interface soignée et responsive.

---

## ✨ Fonctionnalités

- 📄 Interface de création d'identité (NUI HTML/CSS/JS)
- ✅ Compatible ESX Legacy
- 🧠 Vérification des champs (nom, prénom, date de naissance, sexe)
- 🔐 Protection contre les double-insertions (anti-relog bug)
- 🗃️ Enregistrement direct en base de données
- 🌍 Localisation facile (FR / EN possible)

---

## 🔧 Installation

1. Glisse le dossier `mIdentity` dans ton répertoire `resources/[local]/`
2. Ajoute cette ligne dans ton `server.cfg` :
   ```
   ensure mIdentity
   ```
3. Assure-toi d'avoir ESX correctement installé et initialisé avant le lancement de ce script.

---

## 🧩 Dépendances

- `es_extended` (ESX)
- `mysql-async` ou `oxmysql` selon ta base
- Aucun framework UI externe requis (tout est inclus)

---

## 📁 Structure du script

```
mIdentity/
│
├── client/         → Code client-side
├── server/         → Code server-side (insertion BDD, checks, etc.)
├── html/           → Interface utilisateur (formulaire)
├── config.lua      → Config du script (valeurs par défaut, sexe, etc.)
└── fxmanifest.lua  → Déclaration du script
```

---

## 🎥 Preview

[![mIdentity Preview](https://img.youtube.com/vi/xxxxxxxxxxx/0.jpg)](https://www.youtube.com/watch?v=xxxxxxxxxxx)

---

## 🧠 Astuces & Conseils

- Tu peux personnaliser les champs ou ajouter d'autres informations (taille, origine, groupe sanguin…) dans le fichier HTML + `server.lua`.
- Si tu veux déclencher d'autres scripts après l'identité (genre spawn menu, cinématique, etc.), utilise l'event `mIdentity:finished`.

---

## 🚧 Roadmap

- [ ] Support multilingue dynamique
- [ ] Ajout d’un champ photo + prise d’un selfie avec screenshot-basic
- [ ] Système de validation côté staff (optionnel)
- [ ] Intégration automatique avec Discord Webhook

---

## 💬 Support

Tu rencontres un bug ou veux contribuer ?  
Crée une issue ou fais une pull request.  
Tu peux aussi me contacter directement sur Discord : `ton-tag`

---

## 📜 Licence

Ce script est distribué **gratuitement** pour usage personnel et serveurs privés.  
Toute revente est strictement interdite.  
© 2025 — Tous droits réservés.
