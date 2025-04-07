import * as d3 from 'd3';

export function croissance() {
    const container = d3.select('#croissance');
    
    const content = container.append('div')
        .attr('class', 'section-content');
    
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
    
        const width = 1000;
        const height = 500;
        const margin = { top: 20, right: 20, bottom: 50, left: 60 };
        const brickHeight = 20;
    
        const svg = content.append("svg")
        .attr("width", width)
        .attr("height", height);
    
        const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

        g.append("text")
            .attr("x", 0)
            .attr("y", -5) // un peu au-dessus du haut du graph
            .text("Chiffre d'affaire en milliards de couronnes danoises")
            .attr("font-size", "20px")
            .attr("fill", "#333")
            .attr("font-family", "sans-serif");

    
        const x = d3.scaleBand()
        .domain(data.map(d => d.year))
        .range([0, width - margin.left - margin.right])
        .padding(0.2);
    
        const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.revenue)])
        .nice()
        .range([height - margin.top - margin.bottom, 0]);
    
        data.forEach(d => {
            const xPos = x(d.year);
            const bricks = Math.floor((height - margin.bottom - margin.top - y(d.revenue)) / brickHeight);
          
            const columnGroup = g.append("g")  // <- groupement par colonne
              .attr("class", "lego-column");
          
              const baseY = height - margin.top - margin.bottom;

              for (let i = 0; i < bricks; i++) {
                columnGroup.append("rect")
                  .attr("x", xPos)
                  .attr("y", baseY - i * brickHeight - brickHeight)
                  .attr("width", x.bandwidth())
                  .attr("height", brickHeight - 1)
                  .attr("fill", "#e30613")
                  .attr("stroke", "#222");
              }
              
          
            // Interactions hover
            columnGroup
              .on("mouseover", function () {
                d3.select(this).selectAll("rect").attr("fill", "#ffffff");
              })
              .on("mouseout", function () {
                d3.select(this).selectAll("rect").attr("fill", "#e30613");
              });
          });
          
    
        g.append("g")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x).tickValues(data.map(d => d.year).filter((_, i) => i % 2 === 0)));
    
        g.append("g")
        .call(d3.axisLeft(y));

}