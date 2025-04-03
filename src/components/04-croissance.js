import * as d3 from 'd3';

export function croissance() {
    const container = d3.select('#croissance');
    
    const content = container.append('div')
        .attr('class', 'section-content');
    
    content.append('h2')
        .text('Croissance Exceptionnelle');

}
