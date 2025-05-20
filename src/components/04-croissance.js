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

    // Informations sur les sets LEGO Star Wars avec liens d'images fiables
    const legoSets = {
        2000: { 
            name: "Millennium Falcon", 
            number: "3450",
            image: "https://img.bricklink.com/ItemImage/SN/0/3450-1.png"
        },
        2003: { 
            name: "Cloud City", 
            number: "10123",
            image: "https://img.bricklink.com/ItemImage/SN/0/10123-1.png"
        },
        2004: { 
            name: "TIE Fighter Collection", 
            number: "10131",
            image: "https://img.bricklink.com/ItemImage/SN/0/10131-1.png"
        },
        2005: { 
            name: "Death Star II", 
            number: "10143",
            image: "https://img.bricklink.com/ItemImage/SN/0/10143-1.png"
        },
        2006: { 
            name: "Imperial Star Destroyer", 
            number: "6211",
            image: "https://img.bricklink.com/ItemImage/SN/0/6211-1.png"
        },
        2007: { 
            name: "Millennium Falcon UCS", 
            number: "10179",
            image: "https://img.bricklink.com/ItemImage/SN/0/10179-1.png"
        },
        2008: { 
            name: "Death Star", 
            number: "10188",
            image: "https://img.bricklink.com/ItemImage/SN/0/10188-1.png"
        },
        2009: { 
            name: "Republic Dropship", 
            number: "10195",
            image: "https://img.bricklink.com/ItemImage/SN/0/10195-1.png"
        },
        2010: { 
            name: "Imperial Shuttle", 
            number: "10212",
            image: "https://img.bricklink.com/ItemImage/SN/0/10212-1.png"
        },
        2011: { 
            name: "Super Star Destroyer", 
            number: "10221",
            image: "https://img.bricklink.com/ItemImage/SN/0/10221-1.png"
        },
        2012: { 
            name: "R2-D2", 
            number: "10225",
            image: "https://img.bricklink.com/ItemImage/SN/0/10225-1.png"
        },
        2013: { 
            name: "Ewok Village", 
            number: "10236",
            image: "https://img.bricklink.com/ItemImage/SN/0/10236-1.png"
        },
        2014: { 
            name: "Sandcrawler", 
            number: "75059",
            image: "https://img.bricklink.com/ItemImage/SN/0/75059-1.png"
        },
        2015: { 
            name: "Millennium Falcon", 
            number: "75105",
            image: "https://img.bricklink.com/ItemImage/SN/0/75105-1.png"
        },
        2016: { 
            name: "Death Star", 
            number: "75159",
            image: "https://img.bricklink.com/ItemImage/SN/0/75159-1.png"
        },
        2017: { 
            name: "Millennium Falcon UCS", 
            number: "75192",
            image: "https://img.bricklink.com/ItemImage/SN/0/75192-1.png"
        },
        2018: { 
            name: "Betrayal at Cloud City", 
            number: "75222",
            image: "https://img.bricklink.com/ItemImage/SN/0/75222-1.png"
        },
        2019: { 
            name: "Imperial Star Destroyer", 
            number: "75252",
            image: "https://img.bricklink.com/ItemImage/SN/0/75252-1.png"
        },
        2020: { 
            name: "Mos Eisley Cantina", 
            number: "75290",
            image: "https://img.bricklink.com/ItemImage/SN/0/75290-1.png"
        },
        2021: { 
            name: "AT-AT", 
            number: "75313",
            image: "https://img.bricklink.com/ItemImage/SN/0/75313-1.png"
        },
        2022: { 
            name: "Razor Crest", 
            number: "75331",
            image: "https://img.bricklink.com/ItemImage/SN/0/75331-1.png"
        },
        2023: { 
            name: "Executor Super Star Destroyer", 
            number: "75355",
            image: "https://img.bricklink.com/ItemImage/SN/0/75355-1.png"
        },
        2024: { 
            name: "Darth Vader's Castle", 
            number: "75382",
            image: "https://img.bricklink.com/ItemImage/SN/0/75382-1.png"
        }
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
        .attr("fill", "#fff9f9")
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
        .style("border-radius", "4px")
        .style("background-color", "#f9f9f9");

    // Créer l'élément image pour les sets LEGO
    const legoImage = imageContainer.append("img")
        .attr("id", "lego-set-image")
        .style("max-width", "100%")
        .style("max-height", "100%")
        .style("object-fit", "contain")
        .attr("src", "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%22100%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214px%22%20fill%3D%22%23333%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3ESurvolez%20une%20colonne%3C%2Ftext%3E%3C%2Fsvg%3E")
        .attr("alt", "Survolez une colonne");
    
    // Ajouter un fallback SVG en cas d'échec de chargement de l'image
    legoImage.on("error", function() {
        const fallbackSvg = imageContainer.append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "0 0 200 200");
            
        fallbackSvg.append("rect")
            .attr("width", 200)
            .attr("height", 200)
            .attr("fill", "#f0f0f0");
            
        fallbackSvg.append("text")
            .attr("x", 100)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("fill", "#333")
            .text("LEGO Star Wars");
            
        fallbackSvg.append("text")
            .attr("id", "fallback-year")
            .attr("x", 100)
            .attr("y", 100)
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", "#333")
            .text("Image non disponible");
            
        // Supprimer l'image qui a échoué
        d3.select(this).remove();
    });

    // Afficher une petite information sur le set en dessous de l'image
    const setInfoBox = imageBox.append("div")
        .attr("id", "set-info-box")
        .style("width", "100%")
        .style("margin-top", "10px")
        .style("padding", "5px")
        .style("text-align", "center")
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .style("color", "#666");
        
    setInfoBox.text("Survolez une colonne pour voir les sets");

    // Création des colonnes de briques AVEC ANIMATION
data.forEach((d, dataIndex) => {
    const xPos = x(d.year);
    const bricks = Math.floor((height - margin.bottom - margin.top - y(d.revenue)) / brickHeight);
    const baseY = height - margin.top - margin.bottom;

    const columnGroup = g.append("g")
        .attr("class", "lego-column");

    for (let i = 0; i < bricks; i++) {
    columnGroup.append("rect")
        .attr("x", xPos)
        .attr("y", -100) // position de départ AU-DESSUS du graphique
        .attr("width", x.bandwidth())
        .attr("height", brickHeight - 1)
        .attr("fill", "#FFD700")
        .attr("stroke", "#222")
        .attr("data-final-y", baseY - i * brickHeight - brickHeight); // position cible
}


    // Gestion des événements
    columnGroup
        .on("mouseover", function () {
            d3.select(this).selectAll("rect").attr("fill", "#fff9f9");
            d3.select("#year-header").text(`Année : ${d.year}`);
            d3.select("#revenue-info").text(`Chiffre d'affaire : ${d.revenue.toFixed(2)} Mds CHF`);
            

            const setInfo = legoSets[d.year];
            if (setInfo) {
                d3.select("#lego-set-image")
                    .attr("src", setInfo.image)
                    .attr("alt", `LEGO ${setInfo.name} (${setInfo.number})`);
                d3.select("#set-info-box")
                    .html(`C'est le set <strong>${setInfo.name}</strong> qui a été le <br>mieux vendu durant cette année`);
            }
        })
        .on("mouseout", function () {
            d3.select(this).selectAll("rect").attr("fill", "#FFD700");
        });
});

// Animation au scroll : fait tomber les briques
const animateBriques = () => {
    d3.selectAll('.lego-column rect')
        .transition()
        .duration(800)
        .delay((_, i) => i * 10)
        .attr('y', function () {
            return d3.select(this).attr('data-final-y');
        });
};

// Observer pour lancer au scroll
const croissanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateBriques();
            croissanceObserver.disconnect(); // une seule fois
        }
    });
}, { threshold: 0.5 });

const croissanceSection = document.querySelector('#croissance');
if (croissanceSection) {
    croissanceObserver.observe(croissanceSection);
}


    // Ajout des axes
    g.append("g")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x).tickValues(data.map(d => d.year).filter((_, i) => i % 2 === 0)));

    g.append("g")
        .call(d3.axisLeft(y));
}