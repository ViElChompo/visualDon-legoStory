import * as d3 from "d3";

export function impactMondial() {
    const section = d3.select("#impact-mondial");
    const content = section.append("div").attr("class", "section-content");

    // Conteneur principal
    const visualContainer = content.append("div")
        .attr("class", "impact-container");

    // Conteneur texte + compteur + briques
    const visual = visualContainer.append("div")
        .attr("class", "impact-visual");

    // Colonne texte et compteur
    const left = visual.append("div")
        .attr("class", "impact-left");

    // Titre
    left.append("h2").text("Un impact\nmondial").attr("class", "impact-title");

    left.append("p").text("En moyenne, chaque habitant de la planète possède:");

    // Colonne texte + compteur
    const counterSection = left.append("div").attr("class", "counter-section");
    const counter = counterSection.append("div")
        .attr("class", "counter")
        .text("0");

    // Ajout du texte "86 briques"
    counterSection.append("p")
        .attr("class", "bricks-text")
        .text("briques");

    // Colonne des briques
    const bricksContainer = visual.append("div")
        .attr("class", "impact-bricks");

    // Image LEGO Boy
    visual.append("div")
        .attr("class", "impact-image")
        .append("img")
        .attr("src", "images/lego-boy.png")
        .attr("alt", "Personnage LEGO");

    // Fonction animation
    function animateImpact() {
        // Compteur vers 86
        counter.transition()
            .duration(1000)
            .tween("text", function () { 
                const i = d3.interpolateNumber(0, 86);
                return function (t) {
                    counter.text(Math.floor(i(t)));
                };
            });

        // Lancer les briques après le compteur
        setTimeout(() => {
            launchBricks();
        }, 1000);
    }

    // Lancer animation si on arrive dans le viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateImpact();
                observer.unobserve(entry.target); // éviter de rejouer
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector("#impact-mondial"));


    // ------- Mise en place des briques pour chute -- //
    function launchBricks() {
        // taille de l'expace des briques
        const width = 400;
        const height = 400;
        const svg = bricksContainer
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    
        // Paramètres des briques
        const brickWidth = 40;
        const brickHeight = 20;
        const studWidth = 10;
        const studHeight = 5;
        
        const columns = Math.floor(width / brickWidth);
        const columnHeights = Array(columns).fill(0);
    
        // Création des briques
        const bricks = d3.range(86).map((_, i) => {
            const col = Math.floor(Math.random() * columns); // Colonne aléatoire
            const x = col * brickWidth; 
            const y = -Math.random() * 500; // Hauteur de la chute
            
            const finalY = height - (columnHeights[col] + 1) * brickHeight; 
            columnHeights[col]++;
    
            return { x, y, finalY, delay: i * 15 }; // temps de chute entre les briques
        });
    
        const g = svg.selectAll("g")
            .data(bricks)
            .enter()
            .append("g")
            .attr("transform", d => `translate(${d.x}, ${d.y})`);
    
        // Partie principal de la brique
        g.append("rect")
            .attr("width", brickWidth)
            .attr("height", brickHeight)
            .attr("fill", "red")
            .attr("stroke", "black")
            .attr("stroke-width", 1);
    
        // brique gauche
        g.append("rect")
            .attr("x", 6)
            .attr("y", -studHeight)
            .attr("width", studWidth)
            .attr("height", studHeight)
            .attr("fill", "red")
            .attr("stroke", "black")
            .attr("stroke-width", 1);
    
        // bique droite
        g.append("rect")
            .attr("x", brickWidth - studWidth - 6)
            .attr("y", -studHeight)
            .attr("width", studWidth)
            .attr("height", studHeight)
            .attr("fill", "red")
            .attr("stroke", "black")
            .attr("stroke-width", 1);
    
        // Animation des briques
        g.transition()
            .delay(d => d.delay)
            .duration(300) // rebons des briques
            .ease(d3.easeBounceOut) // rebons des briques
            .attr("transform", d => `translate(${d.x}, ${d.finalY})`); // chute des briques depuis le haut
    }
}
