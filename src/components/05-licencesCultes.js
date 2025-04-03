import * as d3 from 'd3';

export function licencesCultes() {
    const container = d3.select('#licences-cultes');
    
    const content = container.append('div')
        .attr('class', 'section-content');
    
    content.append('h2')
        .text('Des Licences Cultes');
    
   
}
