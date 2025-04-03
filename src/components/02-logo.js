import * as d3 from 'd3';

export function logoAnimation() {
    const container = d3.select('#logo');
    
    const content = container.append('div')
        .attr('class', 'section-content');
    
    content.append('h2')
        .text('L\'histoire commence');

}
