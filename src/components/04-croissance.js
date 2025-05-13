import * as d3 from 'd3';

export function croissance() {
    const container = d3.select('#croissance');

    const content = container.append('div')
        .attr('class', 'section-content croissance-graphic');

    content.append('h2')
        .text('Croissance Exceptionnelle');

    const data = [
        { year: 2000, revenue: 9.47 },
        { year: 2003, revenue: 6.8 },
        { year: 2004, revenue: 6.3 },
        { year: 2005, revenue: 7 },
        { year: 2006, revenue: 7.8 },
        { year: 2007, revenue: 8 },
        { year: 2008, revenue: 9.5 },
        { year: 2009, revenue: 11.7 },
        { year: 2010, revenue: 16 },
        { year: 2011, revenue: 18.7 },
        { year: 2012, revenue: 23.1 },
        { year: 2013, revenue: 25.3 },
        { year: 2014, revenue: 28.58 },
        { year: 2015, revenue: 35.78 },
        { year: 2016, revenue: 37.93 },
        { year: 2017, revenue: 35 },
        { year: 2018, revenue: 36.39 },
        { year: 2019, revenue: 38.54 },
        { year: 2020, revenue: 43.66 },
        { year: 2021, revenue: 55.29 },
        { year: 2022, revenue: 64.65 },
        { year: 2023, revenue: 65.91 },
        { year: 2024, revenue: 74.3 },
    ];

    const legoImages = {
        2000: "https://images.brickset.com/sets/large/3450-1.jpg",
        2003: "https://images.brickset.com/sets/large/10123-1.jpg",
        2004: "https://images.brickset.com/sets/large/10131-1.jpg",
        2005: "https://images.brickset.com/sets/large/10143-1.jpg",
        2006: "https://images.brickset.com/sets/large/6211-1.jpg",
        2007: "https://images.brickset.com/sets/large/10179-1.jpg",
        2008: "https://images.brickset.com/sets/large/10188-1.jpg",
        2009: "https://images.brickset.com/sets/large/10195-1.jpg",
        2010: "https://images.brickset.com/sets/large/10212-1.jpg",
        2011: "https://images.brickset.com/sets/large/10221-1.jpg",
        2012: "https://images.brickset.com/sets/large/10225-1.jpg",
        2013: "https://images.brickset.com/sets/large/10236-1.jpg",
        2014: "https://images.brickset.com/sets/large/75059-1.jpg",
        2015: "https://images.brickset.com/sets/large/75105-1.jpg",
        2016: "https://images.brickset.com/sets/large/75159-1.jpg",
        2017: "https://images.brickset.com/sets/large/75192-1.jpg",
        2018: "https://images.brickset.com/sets/large/75222-1.jpg",
        2019: "https://images.brickset.com/sets/large/75252-1.jpg",
        2020: "https://images.brickset.com/sets/large/75290-1.jpg",
        2021: "https://images.brickset.com/sets/large/75313-1.jpg",
        2022: "https://images.brickset.com/sets/large/75331-1.jpg",
        2023: "https://images.brickset.com/sets/large/75355-1.jpg",
        2024: "https://images.brickset.com/sets/large/75382-1.jpg"
    };

    // Configuration du graphique
    const width = 1000;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const brickHeight = 20;

    // Création de la structure de base
    const mainContainer = content.append("div")
        .style("display", "flex")
        .style("flex-direction", "row")
        .style("align-items", "flex-start")
        .style("gap", "20px");
    
    // Conteneur pour le graphique
    const chartContainer = mainContainer.append("div");

    // Création du SVG pour le graphique
    const svg = chartContainer.append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Titre de l'axe Y
    g.append("text")
        .attr("x", 0)
        .attr("y", -5)
        .text("Chiffre d'affaire en milliards de CHF")
        .attr("font-size", "20px")
        .attr("fill", "#333")
        .attr("font-family", "sans-serif");

    // Configuration des échelles
    const x = d3.scaleBand()
        .domain(data.map(d => d.year))
        .range([0, width - margin.left - margin.right])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.revenue)])
        .nice()
        .range([height - margin.top - margin.bottom, 0]);

    // Création de la zone fixe pour les images
    const imageBox = mainContainer.append("div")
        .attr("class", "image-display")
        .style("width", "250px")
        .style("height", "300px")
        .style("border", "1px solid #ccc")
        .style("border-radius", "8px")
        .style("padding", "15px")
        .style("background-color", "white")
        .style("box-shadow", "0 0 10px rgba(0,0,0,0.1)")
        .style("display", "flex")
        .style("flex-direction", "column")
        .style("align-items", "center");

    // Zone d'information textuelle
    const infoContent = imageBox.append("div")
        .style("width", "100%")
        .style("margin-bottom", "15px");
    
    // En-tête pour l'année
    infoContent.append("h3")
        .attr("id", "year-header")
        .style("margin", "0 0 5px 0")
        .style("text-align", "center")
        .style("font-family", "sans-serif")
        .text("Survolez une colonne");
    
    // Information sur le chiffre d'affaires
    infoContent.append("p")
        .attr("id", "revenue-info")
        .style("margin", "0")
        .style("text-align", "center")
        .style("font-family", "sans-serif")
        .text("pour voir les détails");

    // Conteneur pour l'image avec dimensions fixes
    const imageContainer = imageBox.append("div")
        .style("width", "200px")
        .style("height", "200px")
        .style("display", "flex")
        .style("align-items", "center")
        .style("justify-content", "center")
        .style("overflow", "hidden")
        .style("border", "1px solid #ddd")
        .style("border-radius", "4px");

    // L'image elle-même
    imageContainer.append("img")
        .attr("id", "lego-image")
        .style("max-width", "100%")
        .style("max-height", "100%")
        .style("object-fit", "contain")
        .attr("src", "https://via.placeholder.com/200?text=Survolez+une+colonne")
        .attr("alt", "Lego set");

    // Création des colonnes de briques
    data.forEach(d => {
        const xPos = x(d.year);
        const bricks = Math.floor((height - margin.bottom - margin.top - y(d.revenue)) / brickHeight);
        const baseY = height - margin.top - margin.bottom;

        const columnGroup = g.append("g")
            .attr("class", "lego-column");

        for (let i = 0; i < bricks; i++) {
            columnGroup.append("rect")
                .attr("x", xPos)
                .attr("y", baseY - i * brickHeight - brickHeight)
                .attr("width", x.bandwidth())
                .attr("height", brickHeight - 1)
                .attr("fill", "#e30613")
                .attr("stroke", "#222");
        }

        // Gestion des événements de survol
        columnGroup
            .on("mouseover", function () {
                // Mise en évidence de la colonne
                d3.select(this).selectAll("rect").attr("fill", "#FFD700");
                
                // Mise à jour de la zone d'information
                d3.select("#year-header").text(`Année : ${d.year}`);
                d3.select("#revenue-info").text(`Chiffre d'affaire : ${d.revenue.toFixed(2)} Mds CHF`);
                
                // Mise à jour de l'image
                d3.select("#lego-image")
                    .attr("src", legoImages[d.year] || 'https://via.placeholder.com/200?text=Image+non+disponible')
                    .attr("alt", `Lego set de ${d.year}`);
            })
            .on("mouseout", function () {
                // Retour à la couleur normale
                d3.select(this).selectAll("rect").attr("fill", "#e30613");
            });
    });

    // Ajout des axes
    g.append("g")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x).tickValues(data.map(d => d.year).filter((_, i) => i % 2 === 0)));

    g.append("g")
        .call(d3.axisLeft(y));
}