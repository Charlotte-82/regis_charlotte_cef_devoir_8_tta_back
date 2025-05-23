# Trouve Ton Artisan

Trouve Ton Artisan est une application web permettant de rechercher des artisans par spécialité et par ville. Elle permet aussi de consulter une fiche détaillée pour chaque artisan et de le contacter via un formulaire.

## Fonctionnalités

- Recherche d'artisans par catégorie et spécialité
- Filtrage par ville
- Formulaire de contact personnalisé envoyé à l'artisan
- Affichage dynamique des fiches artisans avec image, note, à propos, etc.

## Paquets utilisées

### Front-end :

- React
- React Router
- Bootstrap / SCSS
- Axios

### Back-end :

- Node
- Nodemon
- Express
- Sequelize
- MySQL
- Nodemailer
- Cors
- Dotenv

## Installation

1. Clonez le dépôt :
   git clone https://github.com/Charlotte-82/regis_charlotte_cef_devoir_8_trouve_ton_artisan

2. Installez les dépendances pour le back-end :
   cd back_end
   npm install

3. Installez les dépendances pour le front-end :
   cd ../front_end
   npm install

4. Configurez vos variables d’environnement :
   ADMIN_KEY=cleadministrateurcef2025
   MAIL_USER=mailplateformeartisan@gmail.com (fictif)
   MAIL_PASS=motdepassemail (fictif)
   PORT=5000

5. Lancez le serveur :
   cd back_end
   npm run dev

6. Lancez le front :
   cd ../front_end
   npm start

## Organisation

/front_end: Application React
/back_end: API Express + Sequelize + Nodemailer
/models: Modèles Sequelize
/routes: Routes Express
/controllers: Logique métier
/services: Envoi de mails, requêtes vers la base

## Sources

Icons and images:
https://www.flaticon.com
https://www.pexels.com
