# Movie App - React Native

## Objectif

Ce projet vise à développer une application mobile permettant aux utilisateurs de rechercher des films, d'afficher les détails des films, de vérifier leur âge pour accéder à l'application et de trouver les cinémas disponibles dans une ville choisie. L'application est développée en utilisant React Native et Expo.

## Technologies Utilisées

- **React Native**: Framework pour le développement d'applications mobiles.
- **Expo**: Outils et services pour faciliter le développement et le déploiement d'applications React Native.
- **API Everypixel**: Pour vérifier si l'utilisateur a plus de 18 ans via une photo.
- **API The Movie Database (TMDb)**: Pour rechercher des films et obtenir des détails et des bandes-annonces.
- **API Google Serper**: Pour effectuer des recherches web et trouver des cinémas dans une ville choisie.

## Structure du Projet

Le projet sera organisé de manière à tirer parti de :

- 📁 **`src`**: Contient les composants, les écrans, et les services de l'application.
  - 📄 **`src/components`**: Composants réutilisables de l'application.
  - 📄 **`src/components`**: Écrans principaux de l'application (Accueil, Détails du film, etc.).
- 📄 **`App.js`**: Point d'entrée principal de l'application.

## Fonctionnalités

1. **Vérification de l'âge**:
   - Utilisation de l'API Everypixel pour vérifier si l'utilisateur a plus de 18 ans via une photo prise avec l'appareil photo du téléphone.

2. **Recherche de films**:
   - Rechercher des films et afficher les détails et la bande-annonce via l'API de The Movie Database (TMDb).

3. **Localisation des cinémas**:
   - Recherche des adresses de cinémas disponibles dans une ville choisie via web scraping avec l'API Google Serper pour obtenir la liste des théâtres pour les films à l'affiche.
   - Redirection vers Google Maps pour obtenir l'itinéraire vers le cinéma choisi.


## Utilité

L'application Movie App permet aux utilisateurs de rechercher facilement des films, d'afficher des détails et des bandes-annonces, de vérifier leur âge pour accéder au contenu et de trouver des cinémas proches. Elle offre une expérience utilisateur fluide et intuitive pour les amateurs de cinéma.

## Intégration des API

### Vérification de l'Âge avec Everypixel

Pour vérifier l'âge de l'utilisateur, nous utilisons l'API Everypixel en prenant une photo avec l'appareil photo du téléphone et en l'envoyant à l'API pour analyse.

### Recherche de Films avec TMDb

Pour rechercher des films et afficher des détails et des bandes-annonces, nous utilisons l'API The Movie Database (TMDb). Les utilisateurs peuvent rechercher des films et obtenir des informations complètes, y compris des vidéos de bandes-annonces.

### Localisation des Cinémas avec Google Serper

Pour trouver des cinémas dans une ville choisie, nous utilisons l'API Google Serper pour effectuer des recherches web et afficher les résultats pertinents. Les utilisateurs peuvent ensuite être redirigés vers Google Maps pour obtenir l'itinéraire vers le cinéma choisi.

## Comment Exécuter le Projet

Suivez ces étapes pour exécuter le projet localement :

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Exécution Locale

1. **Cloner le Référentiel**:
   - Exécutez `git clone https://github.com/votre-utilisateur/movie-app.git` pour cloner le projet.

2. **Installation des Dépendances**:
   - Ouvrez un terminal dans le répertoire du projet.
   - Exécutez `npm install` pour installer toutes les dépendances nécessaires.

3. **Lancement de l'Application**:
   - Exécutez `expo start` pour démarrer le projet avec Expo.

4. **Accéder à l'Application**:
   - Utilisez l'application Expo Go sur votre appareil mobile pour scanner le QR code affiché dans le terminal.

