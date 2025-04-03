import * as d3 from 'd3';

export function impactMondial() {
    const container = d3.select('#impact-mondial');
    
    const content = container.append('div')
        .attr('class', 'section-content');
    
    content.append('h2')
        .text('Un impact Mondial');
    
}
