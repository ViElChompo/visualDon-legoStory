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

    const content = container.append('div').attr('class', 'section-content');

    let startTime = performance.now(); // Démarrer le timer au chargement du site

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                let endTime = performance.now();
                let elapsedTime = (endTime - startTime) / 1000; // Temps en secondes

                console.log(`Temps total de navigation : ${elapsedTime.toFixed(2)} secondes`);

                observer.disconnect(); // Arrêter l'observation
            }
        },
        { threshold: 0.5 }
    );

    observer.observe(container.node()); // Observer la section

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

        } catch (error) {
            console.error("Erreur lors du chargement des annonces :", error);
        }
    };

    displayAnnonces();
}
