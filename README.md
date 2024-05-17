# Movie App - React Native

## Objectif

Ce projet vise à développer une application mobile permettant aux utilisateurs de rechercher des films, d'afficher les détails des films, de vérifier leur âge pour accéder à l'application et de trouver les cinémas disponibles dans une ville choisie. L'application est développée en utilisant React Native et Expo.

## Technologies Utilisées

- **React Native**: Framework pour le développement d'applications mobiles.
- **Expo**: Outils et services pour faciliter le développement et le déploiement d'applications React Native.
- **API Everypixel**: Pour vérifier si l'utilisateur a plus de 18 ans via une photo avec IA.
- **API The Movie Database (TMDb)**: Pour rechercher des films et obtenir des détails et des bandes-annonces.
- **API Google Serper**: Pour effectuer des recherches web et trouver des cinémas dans une ville choisie.

## Structure du Projet

Le projet sera organisé de manière à tirer parti de :

- 📁 **`src`**: Contient les composants, les écrans, et les services de l'application.
  - 📄 **`src/components`**: Composants réutilisables de l'application.
  - 📄 **`src/components`**: Écrans principaux de l'application (Accueil, Détails du film, etc.).
- 📄 **`App.js`**: Point d'entrée principal de l'application.

## Fonctionnalités

**Vérification de l'âge avec IA**:
   - Utilisation de l'API Everypixel pour vérifier si l'utilisateur a plus de 18 ans via une photo prise avec l'appareil photo du téléphone. L'IA analyse la photo pour estimer l'âge de l'utilisateur.

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

### Capture d'ecran

![WhatsApp Image 2024-05-17 at 13 22 41_f1892818](https://github.com/killer-beep07/Movies-App/assets/130712993/bce0fd4e-8cf6-4dc4-a778-574599e0ac59)
![rsz_1ai](https://github.com/killer-beep07/Movies-App/assets/130712993/574c55c1-3555-4354-8fb5-b9afaddfebf0)
![rsz_66475046206a8](https://github.com/killer-beep07/Movies-App/assets/130712993/1bf71d4a-64d2-482c-870b-9a96bb971d04)

![WhatsApp Image 2024-05-17 at 13 22 42_a939b062](https://github.com/killer-beep07/Movies-App/assets/130712993/8c94ed25-bb7d-4bfe-b5f3-e62ae3331f3b)
![WhatsApp Image 2024-05-17 at 13 22 43_9510c37f](https://github.com/killer-beep07/Movies-App/assets/130712993/b2a8870e-e7a3-4d82-aae1-95f9f40e2bdd)
![WhatsApp Image 2024-05-17 at 13 22 44_215fe3a7](https://github.com/killer-beep07/Movies-App/assets/130712993/13eff8d2-7f83-4ad0-b135-18844449d79d)
![WhatsApp Image 2024-05-17 at 13 22 44_39daec1f](https://github.com/killer-beep07/Movies-App/assets/130712993/b14e376d-ded6-480b-8bda-0df639be8884)
![WhatsApp Image 2024-05-17 at 13 22 45_ad905b99](https://github.com/killer-beep07/Movies-App/assets/130712993/3c75e470-539c-43b2-8a3c-50bec35e5cd8)
![WhatsApp Image 2024-05-17 at 13 22 46_89de8f8d](https://github.com/killer-beep07/Movies-App/assets/130712993/b762a946-f1d8-4db9-ac57-da752c9654b9)
![WhatsApp Image 2024-05-17 at 13 22 47_d67b2e77](https://github.com/killer-beep07/Movies-App/assets/130712993/78cd6a2f-f18e-44ac-a197-a389b75c832b)
![WhatsApp Image 2024-05-17 at 13 22 47_eb852884](https://github.com/killer-beep07/Movies-App/assets/130712993/64cd2b96-df69-4e15-9721-180fd125d3de)
![WhatsApp Image 2024-05-17 at 13 22 47_17f323e7](https://github.com/killer-beep07/Movies-App/assets/130712993/16f61106-eace-4050-8992-d10fb7ced4eb)












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

