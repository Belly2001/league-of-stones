# League of Stones

Jeu de cartes multijoueur en ligne inspiré de Hearthstone et League of Legends.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

## Description

Application web de jeu de cartes où deux joueurs s'affrontent en temps réel. Chaque joueur construit un deck de 20 cartes représentant des champions de League of Legends, puis combat en tour par tour jusqu'à réduire les points de vie adverses à zéro.

## Fonctionnalités

- **Authentification** : Inscription et connexion sécurisées avec JWT
- **Matchmaking** : Création de partie, envoi de demandes, acceptation de défis
- **Construction de deck** : Sélection de 20 cartes parmi les champions disponibles
- **Combat tour par tour** :
  - Pioche automatique à chaque tour
  - Pose de cartes sur le plateau (max 5)
  - Attaques entre cartes ou directement sur l'adversaire
  - Gestion des points de vie (150 PV initiaux)

## Stack technique

### Frontend
- **Next.js** (Pages Router)
- **React** (useState, useEffect)
- **CSS Modules**

### Backend
- **Node.js** / **Express**
- **MongoDB** (conteneurisé avec Docker)
- **JWT** pour l'authentification

## Installation

### Prérequis
- Node.js (v16+)
- Docker Desktop
- MongoDB Compass (optionnel)

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/league-of-stones.git
cd league-of-stones
```

### 2. Lancer la base de données
```bash
cd Backend/League-Of-Stones
docker-compose up -d
```

### 3. Lancer le backend
```bash
cd Backend/League-Of-Stones
npm install
npm start
```
Le serveur démarre sur `http://localhost:3001`

### 4. Lancer le frontend
```bash
cd projet
npm install
npm run dev
```
L'application est accessible sur `http://localhost:3000`

## Structure du projet

```
LEAGUE-OF-STONES/
├── Backend/League-Of-Stones/
│   ├── app.js
│   ├── modules/
│   │   ├── matchmaking.js
│   │   └── match.js
│   └── docker-compose.yml
│
└── projet/
    └── src/
        ├── components/
        │   ├── NavBar.js
        │   ├── Inscription.js
        │   ├── Connexion.js
        │   ├── BuildDeck.js
        │   ├── Participer.js
        │   ├── Demande.js
        │   └── Match.js
        ├── pages/
        └── styles/
```

## API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| PUT | `/user` | Créer un compte |
| POST | `/login` | Se connecter |
| POST | `/logout` | Se déconnecter |
| GET | `/cards` | Liste des champions |
| GET | `/matchmaking/participate` | Créer une partie |
| GET | `/matchmaking/getAll` | Liste des parties |
| GET | `/matchmaking/request?matchmakingId=xxx` | Demander à rejoindre |
| GET | `/matchmaking/acceptRequest?matchmakingId=xxx` | Accepter une demande |
| GET | `/match/getMatch` | État du match |
| GET | `/match/initDeck?deck=[...]` | Soumettre son deck |
| GET | `/match/pickCard` | Piocher une carte |
| GET | `/match/playCard?card=KEY` | Poser une carte |
| GET | `/match/attack?card=KEY&ennemyCard=KEY` | Attaquer une carte |
| GET | `/match/attackPlayer?card=KEY` | Attaquer le joueur |
| GET | `/match/endTurn` | Terminer son tour |

## Règles du jeu

| Règle | Valeur |
|-------|--------|
| Points de vie initiaux | 150 |
| Cartes en main au départ | 4 |
| Taille max du plateau | 5 |
| Taille du deck | 20 cartes |
| Pioche par tour | 1 carte |

### Combat
- **ATK > DEF adverse** : La carte adverse est détruite, dégâts infligés au joueur
- **ATK < DEF adverse** : Votre carte est détruite
- **ATK = DEF** : Les deux cartes sont détruites
- **Attaque directe** : Possible uniquement si le plateau adverse est vide

## Auteur

Projet universitaire — Licence 3 MIASHS, Université Toulouse Jean Jaurès

## Licence

Ce projet est à usage éducatif.
