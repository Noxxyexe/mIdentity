# 🌐 mIdentity

**mIdentity** est un script FiveM (ESX) moderne, simple et efficace pour la **création d'identité des joueurs** lors de leur première connexion. Il s'inscrit dans une logique d'immersion RP et d'ergonomie, avec une interface soignée et responsive.

---

## ✨ Fonctionnalités

- 📄 Interface de création d'identité (NUI HTML/CSS/JS)
- ✅ Compatible ESX Legacy
- 🧠 Vérification des champs (nom, prénom, date de naissance, sexe)
- 🗃️ Enregistrement direct en base de données
- 🌍 Localisation FR

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
├── client.lua          → Code client-side
├── server.lua          → Code server-side (insertion BDD, checks, etc.)
├── ui/                 → Interface utilisateur (formulaire)
└── fxmanifest.lua      → Déclaration du script
```

---

## 🎥 Preview

[![mIdentity Preview](https://img.youtube.com/vi/vsyk9mCkPXE/0.jpg)](https://www.youtube.com/watch?v=vsyk9mCkPXE)

---

## 🧠 Astuces & Conseils

- Tu peux personnaliser les champs dans le fichier HTML.

---

## 💬 Support

Tu rencontres un bug ou veux contribuer ?  
Crée une issue ou fais une pull request.  
Tu peux aussi me contacter directement sur Discord : `https://discord.gg/WaNB7dCRZW`

---

## 📜 Licence

Ce script est distribué **gratuitement** pour usage personnel et serveurs privés.  
Toute revente est strictement interdite.  
© 2025 — Tous droits réservés.
