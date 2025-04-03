import * as d3 from 'd3';

export function introduction() {
    const container = d3.select('#introduction');
    
    // Création du contenu
    const content = container.append('div')
        .attr('class', 'section-content');
    
    content.append('h1')
        .text('D\'une simple brique');
    

    
    
}
