import * as d3 from 'd3';

export function introduction() {
    const container = d3.select('#introduction')
        .attr('class', 'scrollytelling-section simple-brique-section');

    const textContainer = container.append('div')
        .attr('class', 'text-content');

    textContainer.append('div').text('D’UNE');
    textContainer.append('div').text('SIMPLE');
    textContainer.append('div')
        .html('<span class="highlight">BRIQUE</span>');

    // Ajout de la brique LEGO
    const svg = container.append('svg');

    svg.append('rect') // dessous
        .attr('x', 0)
        .attr('y', 40)
        .attr('width', 350)
        .attr('height', 95)
        .attr('fill', '#E30613') 
        .attr('stroke', '#000')
        .attr('stroke-width', 2);

    const studWidth = 75; // taille des brique du dessus
    for (let i = 0; i < 3; i++) { // nombre de briques
        svg.append('rect')
            .attr('x', i * (studWidth + 62)) // distance entre les briques
            .attr('y', 10)
            .attr('width', studWidth)
            .attr('height', 30)
            .attr('fill', '#E30613')
            .attr('stroke', '#000')
            .attr('stroke-width', 2);
    }
}
