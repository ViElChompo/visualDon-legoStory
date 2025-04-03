import * as d3 from 'd3';

export function timer() {
    const container = d3.select('#temps-reel');
    
    const content = container.append('div') 
        .attr('class', 'section-content');
    
    content.append('h2')
        .text('LEGO en Temps Réel');

    // Code ici

}

