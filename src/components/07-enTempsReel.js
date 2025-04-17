import * as d3 from 'd3';
import { loadSets } from "../../api";

/**
 * Sélectionne aléatoirement un set parmi les 10 plus grands sets LEGO
 * et calcule combien d'exemplaires sont nécessaires
 */
function matchTimeToRandomLegoSet(navigationTimeSeconds, legoSets, piecesPerSecond = 1000) {
    if (!legoSets || !Array.isArray(legoSets) || legoSets.length === 0) return null;

    const totalPiecesNeeded = Math.round(navigationTimeSeconds * piecesPerSecond);
    
    // Filtrer les sets valides et les trier par nombre de pièces (décroissant)
    const validSets = legoSets
        .filter(set => set.num_parts && set.num_parts > 0)
        .sort((a, b) => b.num_parts - a.num_parts);
    
    if (validSets.length === 0) return null;
    
    // Prendre les 10 plus grands sets (ou moins s'il n'y en a pas 10)
    const topSets = validSets.slice(0, 10);
    
    // Sélectionner un set aléatoirement parmi les 10 plus grands
    const randomIndex = Math.floor(Math.random() * topSets.length);
    const selectedSet = topSets[randomIndex];
    
    // Calculer exactement combien d'exemplaires sont nécessaires (y compris les décimales)
    const exactInstances = totalPiecesNeeded / selectedSet.num_parts;
    const instances = Math.ceil(exactInstances); // Arrondi supérieur pour l'affichage visuel
    const totalPieces = selectedSet.num_parts * instances;
    
    return {
        set: selectedSet,
        instances: instances,
        exactInstances: exactInstances.toFixed(2), // Garde 2 décimales
        totalPieces: totalPieces,
        navigationTimeSeconds,
        totalPiecesNeeded
    };
}

export function timer() {
    const container = d3.select('#temps-reel');
    if (container.empty()) {
        console.error("Erreur : l'élément #temps-reel est introuvable !");
        return;
    }

    // Création de l'en-tête de la section
    const header = container.append('div')
        .attr('class', 'section-header');
    header.append('h2').text('LEGO en Temps Réel');

    // Utilisation de classes CSS pour le style (aucune instruction inline)
    const timerContainer = container.append('div')
        .attr('class', 'timer-container');
    timerContainer.append('span')
        .attr('id', 'timer-value');

    const matchContainer = container.append('div')
        .attr('class', 'lego-match-container');
        
    const matchTitle = matchContainer.append('h3')
        .text('Pour chaque seconde de navigation, 1000 pièces Lego ont été construites :');

    const matchContent = matchContainer.append('div')
        .attr('class', 'match-content');

    let startTime = performance.now();
    let timerStopped = false;
    let legoSetsData = [];

    const updateTimer = () => {
        if (timerStopped) return;
        const endTime = performance.now();
        const elapsedTime = (endTime - startTime) / 1000;
        //d3.select('#timer-value').text(`Temps total de navigation : ${elapsedTime.toFixed(2)} secondes`);
    };

    const stopTimer = () => {
        if (timerStopped) return;
        const endTime = performance.now();
        const elapsedTime = (endTime - startTime) / 1000;

        //d3.select('#timer-value').text(`Temps total de navigation : ${elapsedTime.toFixed(2)} secondes - TERMINÉ`);
        console.log(`Timer arrêté à ${elapsedTime.toFixed(2)} secondes (section visible à 50%)`);

        const matchResult = matchTimeToRandomLegoSet(elapsedTime, legoSetsData, 1000);

        if (matchResult) {
            matchContainer.style('display', 'block');
            
            // Réinitialiser le contenu
            matchContent.html("");
            
            // Afficher le nombre total de pièces
            matchContent.append('div')
                .attr('class', 'total-pieces-info')
                .html(`<p><strong>Pièces LEGO construites:</strong> ${matchResult.totalPiecesNeeded.toLocaleString()} pièces</p>`);
            
            // Créer un conteneur pour le set
            const setItem = matchContent.append('div')
                .attr('class', 'set-item');
            
            // Créer un titre et les informations sur le set
            setItem.append('h4')
                .text(matchResult.set.name)
                .style('text-decoration', 'underline');
            
            const setInfo = setItem.append('div')
                .attr('class', 'set-info');
            
            const infoList = setInfo.append('ul')
                .attr('class', 'set-info-list');
            
            infoList.append('li')
                .html(`<strong>Nombre de pièces par set:</strong> ${matchResult.set.num_parts}`);
            infoList.append('li')
                .html(`<strong>Total de pièces créées:</strong> ${matchResult.totalPiecesNeeded.toLocaleString()}`);
            
            // Créer un conteneur pour l'image
            const imagesContainer = setItem.append('div')
                .attr('class', 'set-images-container');
            
            // Afficher l'image du set
            imagesContainer.append('img')
                .attr('src', matchResult.set.set_img_url)
                .attr('alt', matchResult.set.name)
                .attr('class', 'set-image-instance')
                .style('width', '25vw')
                .style('margin', '3px');
            
            // Afficher le nombre exact d'instances nécessaires avec 2 décimales
            setItem.append('h3')
                .attr('class', 'match-result-title')
                .html(`Il vous faudrait exactement <strong>${matchResult.exactInstances} X</strong> ce set pour atteindre le nombre de pièces créées pendant votre navigation`);
        }

        timerStopped = true;
    };

    const observer50 = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                stopTimer();
                observer50.disconnect();
            }
        },
        { threshold: 0.5 }
    );

    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !timerStopped) {
                updateTimer();
                console.log("Section #temps-reel visible, timer mis à jour");
            }
        },
        { threshold: [0.1, 0.3, 0.5, 0.7, 0.9] }
    );

    observer.observe(container.node());
    observer50.observe(container.node());
    console.log("Observers initialisés pour #temps-reel");

    const loadAndStoreSets = async () => {
        try {
            const data = await loadSets();

            console.log(data);
            if (!data || !data.results) {
                console.error("Erreur : données invalides reçues !");
                return;
            }
            legoSetsData = data.results;
        } catch (error) {
            console.error("Erreur lors du chargement des sets LEGO :", error);
        }
    };

    loadAndStoreSets();
}