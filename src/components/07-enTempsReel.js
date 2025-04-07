import * as d3 from 'd3';
import { loadSets } from "../../api";

export function timer() {
    const container = d3.select('#temps-reel');

    if (container.empty()) {
        console.error("Erreur : l'élément #temps-reel est introuvable !");
        return;
    }

    // Ajout d'un conteneur distinct pour le titre et le contenu
    const header = container.append('div').attr('class', 'section-header');
    header.append('h2').text('LEGO en Temps Réel');

    // Conteneur pour le timer
    const timerContainer = container.append('div')
        .attr('class', 'timer-container')
        .style('margin', '20px 0')
        .style('padding', '10px')
        .style('background-color', '#000000')
        .style('color', 'white') // Texte blanc pour contraster avec le fond noir
        .style('border-radius', '5px')
        .style('text-align', 'center')
        .style('font-size', '18px')
        .style('font-weight', 'bold');
    
    timerContainer.append('span')
        .attr('id', 'timer-value')
        .text('Calcul du temps de navigation...');

    const content = container.append('div').attr('class', 'section-content');

    // Enregistrer le temps de début
    let startTime = performance.now();
    let timerStopped = false;
    
    // Fonction pour mettre à jour le timer
    const updateTimer = () => {
        if (timerStopped) return; // Ne pas mettre à jour si le timer est arrêté
        
        const endTime = performance.now();
        const elapsedTime = (endTime - startTime) / 1000; // Temps en secondes
        d3.select('#timer-value').text(`Temps total de navigation : ${elapsedTime.toFixed(2)} secondes`);
    };

    // Fonction pour arrêter le timer à 50% de visibilité
    const stopTimer = () => {
        if (timerStopped) return; // Éviter les appels multiples
        
        const endTime = performance.now();
        const elapsedTime = (endTime - startTime) / 1000; // Temps en secondes
        
        d3.select('#timer-value')
            .text(`Temps total de navigation : ${elapsedTime.toFixed(2)} secondes - TERMINÉ`);
        
        console.log(`Timer arrêté à ${elapsedTime.toFixed(2)} secondes (section visible à 50%)`);
        
        timerStopped = true;
    };

    // Observer spécifique pour le seuil de 50%
    const observer50 = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                stopTimer();
                observer50.disconnect();
            }
        },
        { threshold: 0.5 } // Seuil exact de 50%
    );

    // Observer pour les mises à jour générales (seuils multiples)
    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !timerStopped) {
                updateTimer();
                console.log("Section #temps-reel visible, timer mis à jour");
            }
        },
        { threshold: [0.1, 0.3] } // Observer à différents niveaux, mais pas 0.5
    );

    // Observer le conteneur
    observer.observe(container.node());
    observer50.observe(container.node()); // Observer séparément pour le seuil de 50%
    console.log("Observers initialisés pour #temps-reel");

    const displayAnnonces = async () => {
        try {
            const annonces = await loadSets();

            if (!annonces || !annonces.results) {
                console.error("Erreur : données invalides reçues !");
                return;
            }

            // Trier les sets par nombre de pièces (num_parts) en ordre décroissant
            const largestSets = annonces.results
                .filter(set => set.num_parts) // Garder les sets qui ont un nombre de pièces défini
                .sort((a, b) => b.num_parts - a.num_parts) // Trier du plus grand au plus petit
                .slice(0, 10); // Prendre les 10 premiers

            content.html(""); // Nettoyer uniquement le contenu, sans toucher au titre

            largestSets.forEach((set) => {
                const div = content.append("div").style("margin", "10px");

                div.append("img")
                    .attr("src", set.set_img_url)
                    .attr("alt", set.name)
                    .style("width", "200px");

                div.append("p")
                    .text(`${set.name} - ${set.num_parts} pièces`);
            });

            // Mettre à jour le timer une fois les données chargées
            updateTimer();

        } catch (error) {
            console.error("Erreur lors du chargement des annonces :", error);
            // Afficher l'erreur dans l'interface
            content.append("div")
                .style("color", "red")
                .text(`Erreur lors du chargement des annonces : ${error.message}`);
        }
    };

    displayAnnonces();
}