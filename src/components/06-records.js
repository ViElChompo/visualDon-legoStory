import * as d3 from 'd3';

export function records() {
    const container = d3.select('#records');
    
    const content = container.append('div')
        .attr('class', 'section-content');
    
    content.append('h2')
        .text('Une Communauté de Record');
    
    
    
}
