import * as d3 from 'd3';

export function records() {
    const container = d3.select('#records');

    // --- Partie Gauche : Textes et titre ---
    const left = container.append('div')
        .attr('class', 'record-left');

    left.append('h4')
        .html('UNE COMMUNAUTÉ<br>DE RECORDS');

    // Création d'un conteneur pour les infos avec espacement plus grand
    const infoContainer = left.append('div')
        .attr('class', 'info-container')
        .style('display', 'flex')
        .style('flex-direction', 'column')
        .style('justify-content', 'space-evenly') // Pour répartir les infos sur toute la hauteur
        .style('height', 'calc(180vh - 150px)') // Hauteur calculée pour aligner avec le pied de la tour
        .style('margin-top', '60px'); // Gap plus grand avec le titre

    const info1 = infoContainer.append('div')
        .attr('class', 'tower-info info-1')
        .html('Découvrez le record<br>de la tour<br>LEGO la plus haute');

    const info2 = infoContainer.append('div')
        .attr('class', 'tower-info info-2')
        .html('Construite à Tel-Aviv,<br>en 2017');

    const info3 = infoContainer.append('div')
        .attr('class', 'tower-info info-3')
        .html('Elle est constituée<br>de 550 000 briques');

    const info4 = infoContainer.append('div')
        .attr('class', 'tower-info info-4')
        .html('Pour atteindre la<br>hauteur de 36 mètres');

    const info5 = infoContainer.append('div')
        .attr('class', 'tower-info info-5')
        .html('Soit la hauteur d\'un<br>immeuble de douze<br>étages');

    // --- Partie Droite : Tour LEGO et Bonhomme ---
    const right = container.append('div')
        .attr('class', 'record-right');

    // Ajout d'un conteneur qui regroupe la tour et le lego man
    const towerContainer = right.append('div')
        .attr('class', 'tower-container');

    // Ajout du bonhomme LEGO
    const legoMan = towerContainer.append('div')
        .attr('class', 'lego-man')
        .style('opacity', 0); // Invisible au début

    legoMan.append('img')
        .attr('src', 'public/images/lego-figure.png')
        .attr('alt', 'Bonhomme LEGO');

    // Ajout de la tour (SVG)
    const svgWidth = 300; // Maintien de la largeur originale
    const svgHeight = Math.max(document.documentElement.clientHeight * 1.8, 1500); // 180vh
    const brickWidth = 20;
    const brickHeight = 10;
    const colors = ["#FFD700", "#FF0000"]; // Garder uniquement jaune et rouge comme demandé

    const svg = towerContainer.append('svg')
        .attr('id', 'lego-tower')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

    const bricks = [];

    function generateInvertedPyramidTower() {
        const rows = Math.floor(svgHeight / brickHeight);
        const maxCols = Math.floor(svgWidth / brickWidth);

        for (let row = 0; row < rows; row++) {
            const pyramidFactor = Math.pow(row / rows, 1.2);
            const colsInThisRow = Math.max(3, Math.floor(maxCols * pyramidFactor));
            const startX = (svgWidth - (colsInThisRow * brickWidth)) / 2;

            for (let col = 0; col < colsInThisRow; col++) {
                const colorIdx = Math.random() < 0.7 ? 1 : 0; 
                bricks.push({
                    x: startX + col * brickWidth,
                    y: row * brickHeight,
                    color: colors[colorIdx],
                    delay: (rows - row) * 10
                });
            }
        }
        return bricks;
    }

    const towerBricks = generateInvertedPyramidTower();

    const brickElements = svg.selectAll('rect')
        .data(towerBricks)
        .enter()
        .append('rect')
        .attr('class', 'brick')
        .attr('x', d => d.x)
        .attr('y', d => -50)
        .attr('width', brickWidth - 1)
        .attr('height', brickHeight - 1)
        .attr('fill', d => d.color)
        .attr('opacity', 1);

    function animateBricksDropping() {
        brickElements
            .transition()
            .duration(1000)
            .delay(d => d.delay)
            .attr('y', d => d.y)
            .attr('opacity', 1);

        setTimeout(() => {
            legoMan.transition()
                .duration(500)
                .style('opacity', 1);
        }, towerBricks.length * 5 + 1000);
    }

    // Modification pour que les éléments s'affichent au fur et à mesure du scroll
    // On utilise une fonction pour calculer le seuil de déclenchement en fonction de la position
    function getThresholdByIndex(idx, total) {
        // Répartit les seuils uniformément entre 0.2 et 0.8
        return 0.2 + (idx / (total - 1)) * 0.6;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBricksDropping();
                observer.disconnect();
            }
        });
    }, { threshold: 0.2 });

    observer.observe(document.querySelector('#records'));

    const infoElements = [info1, info2, info3, info4, info5];

    // Création d'observateurs individuels pour chaque élément d'information
    infoElements.forEach((el, idx) => {
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    d3.select(entry.target)
                        .style('opacity', 0)
                        .transition()
                        .duration(800)
                        .style('opacity', 1);

                    textObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: getThresholdByIndex(idx, infoElements.length),
            rootMargin: "0px 0px -50px 0px" 
        });
        
        textObserver.observe(el.node());
    });

    // Assurer que la tour remplit bien la section records
    d3.select('#lego-tower')
        .style('max-height', '180vh')
        .style('height', '180vh');

    // Maintenir les dimensions du conteneur
    d3.select('.record-right')
        .style('height', '180vh');
}