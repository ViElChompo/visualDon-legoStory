import * as d3 from 'd3';
import { loadSets } from "../../api";

/**
 * Trouve un set LEGO dont le nombre de pièces correspond au temps de navigation
 */
function matchTimeToLegoSet(navigationTimeSeconds, legoSets, factor = 15) {
    if (!legoSets || !Array.isArray(legoSets) || legoSets.length === 0) return null;

    const equivalentPieces = Math.round(navigationTimeSeconds * factor);

    const validSets = legoSets.filter(set => set.num_parts && set.num_parts > 0);
    if (validSets.length === 0) return null;

    let closestSet = validSets[0];
    let smallestDifference = Math.abs(closestSet.num_parts - equivalentPieces);

    validSets.forEach(set => {
        const difference = Math.abs(set.num_parts - equivalentPieces);
        if (difference < smallestDifference) {
            closestSet = set;
            smallestDifference = difference;
        }
    });

    const matchPercentage = 100 - (smallestDifference / closestSet.num_parts * 100);

    return {
        set: closestSet,
        navigationTimeSeconds,
        equivalentPieces,
        actualPieces: closestSet.num_parts,
        difference: smallestDifference,
        matchPercentage: matchPercentage.toFixed(2)
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
        .attr('id', 'timer-value')
        .text('Calcul du temps de navigation...');

    const matchContainer = container.append('div')
        .attr('class', 'lego-match-container');
        
    const matchTitle = matchContainer.append('h3')
        .text('Votre temps de navigation (*15) correspond à ce set LEGO :');

    const matchContent = matchContainer.append('div')
        .attr('class', 'match-content');
        
    const matchImage = matchContent.append('div')
        .attr('class', 'match-image');

    const matchInfo = matchContent.append('div')
        .attr('class', 'match-info');

    let startTime = performance.now();
    let timerStopped = false;
    let legoSetsData = [];

    const updateTimer = () => {
        if (timerStopped) return;
        const endTime = performance.now();
        const elapsedTime = (endTime - startTime) / 1000;
        d3.select('#timer-value').text(`Temps total de navigation : ${elapsedTime.toFixed(2)} secondes`);
    };

    const stopTimer = () => {
        if (timerStopped) return;
        const endTime = performance.now();
        const elapsedTime = (endTime - startTime) / 1000;

        d3.select('#timer-value').text(`Temps total de navigation : ${elapsedTime.toFixed(2)} secondes - TERMINÉ`);
        console.log(`Timer arrêté à ${elapsedTime.toFixed(2)} secondes (section visible à 50%)`);

        const matchResult = matchTimeToLegoSet(elapsedTime, legoSetsData, 15);

        if (matchResult) {
            matchContainer.style('display', 'block');

            matchImage.html("")
                .append('img')
                .attr('src', matchResult.set.set_img_url)
                .attr('alt', matchResult.set.name);

            matchInfo.html("")
                .append('h4')
                .text(matchResult.set.name);

            const infoList = matchInfo.append('ul')
                .attr('class', 'match-info-list');

            infoList.append('li')
                .html(`<strong>Nombre de pièces :</strong> ${matchResult.set.num_parts}`);
            infoList.append('li')
                .html(`<strong>Temps de navigation x 15 :</strong> ${matchResult.equivalentPieces} pièces`);
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
        { threshold: [0.1, 0.3] }
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
