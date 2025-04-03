"use strict";
// Importation des composants
import { timer } from "./components/07-enTempsReel";
import { introduction } from "./components/01-introduction";
import { logoAnimation } from "./components/02-logo";
import { impactMondial } from "./components/03-impactMondial";
import { croissance } from "./components/04-croissance";
import { licencesCultes } from "./components/05-licencesCultes";
import { records } from "./components/06-records";

// Configuration des sections avec leurs composants et leurs identifiants, cela permet de faire une boucle sur les sections et d'exécuter le composant de chaque section
const sections = [
    { id: 'introduction', component: introduction },
    { id: 'logo', component: logoAnimation },
    { id: 'impact-mondial', component: impactMondial },
    { id: 'croissance', component: croissance },
    { id: 'licences-cultes', component: licencesCultes },
    { id: 'records', component: records },
    { id: 'temps-reel', component: timer }
];

/**
 * Fonction qui initialise toutes les sections de la page
 * Cette fonction est appelée une fois que le DOM est complètement chargé
 */
function initSections() {
    // Récupère le conteneur principal qui va accueillir toutes les sections
    const container = document.querySelector('#scrollytelling-container');

    // Pour chaque section définie dans le tableau sections
    sections.forEach(section => {
        // Création d'un nouvel élément section dans le DOM 
        const sectionElement = document.createElement('section');
        
        // Attribution de l'ID unique à la section
        sectionElement.id = section.id;
        
        // Attribution de la classe CSS pour le style
        sectionElement.className = 'scrollytelling-section';
        
        // Ajout de la section au conteneur principal
        container.appendChild(sectionElement);
        
        // Exécution immédiate de la fonction du composant
        // Cela initialise la visualisation ou le contenu de la section 
        section.component();
    });
}

// Écouteur d'événement qui attend que le DOM soit complètement chargé 
// avant d'initialiser les sections 
document.addEventListener('DOMContentLoaded', initSections);