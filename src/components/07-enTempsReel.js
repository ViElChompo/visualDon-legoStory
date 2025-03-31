'use strict';

import { loadSets } from "../../api";

document.addEventListener("DOMContentLoaded", () => {
  let startTime = performance.now(); // Démarrer le timer au chargement du site

  const targetSection = document.querySelector("#enTempsReel-07"); // Dernière section

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        let endTime = performance.now();
        let elapsedTime = (endTime - startTime) / 1000; // Temps en secondes

        console.log(
          `Temps total de navigation : ${elapsedTime.toFixed(2)} secondes`
        );

        observer.disconnect(); // Arrêter l'observation
        console.log(elapsedTime);
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(targetSection); // Observer la dernière section
});

const displayAnnonces = async () => {
  const annonces = await loadSets();
  console.log(annonces);
};

displayAnnonces();