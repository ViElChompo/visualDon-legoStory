import * as d3 from 'd3';

export function logoAnimation() {
    const container = d3.select('#logo');

    // Création d'un seul bloc
    const content = container.append('div')
        .attr('class', 'section-content');

    content.append('h2')
        .attr('class', 'fade-up')
        .html('<span class="histoire">L\'histoire</span><br><span class="commence">commence</span>');

    // tableau de images et dates, synchronisé pour s'afficher en même temps
    const images = ['1934.png', '1936.png', '1946.png' , '1948.png', '1950.png' , '1952.png', '1953.png', '1954.png', '1955.png', '1959.png', '1960.png', '1964.png', '1972.png', '1998.png'];
    const dates = ['1934', '1936', '1946' , '1948', '1950' , '1952', '1953', '1954', '1955', '1959', '1960', '1964', '1972', '1998'];

    // temps de l'animation
    const totalDuration = 2500; // en ms
    const stepDuration = totalDuration / images.length;

    let hasPlayed = false; // vérifie que l'animation n'a pas déjà été faite


    function runAnimation() {
        if (hasPlayed) return; // Si l'animation a déjà joué, on ne refait rien
        hasPlayed = true; // Marque l'animation comme jouée

        // Ajout de l'image et du texte initial
        const img = content.append('img') 
            .attr('src', `images/${images[0]}`) // image 0 du tab
            .attr('width', '100%')
            .attr('height', '100%');

        const dateText = content.append('p') // ajout de la date 0
            .attr('class', 'date')
            .text(dates[0]);

        let index = 1; // Initialisation de l'index pour les étapes suivantes

        const interval = d3.interval(() => { 
            if (index < images.length) {
                img.attr('src', `images/${images[index]}`); // change l'image
                dateText.text(dates[index]);                // change la date
                index++;                                    //augmente l'index pour passer à la suite
            } else {
                interval.stop(); // stop l'intervale une fois que l'animation est finie
                dateText.remove(); // enlève le texte des dates

                 // Affiche le nombre d'années d'existence
                const currentYear = new Date().getFullYear(); 
                const anniversary = currentYear - 1932;

                // Affiche l'anniversaire
                content.append('p')
                    .attr('class', 'anniversary')
                    .text(`${anniversary} ans d'existence`);
            }
        }, stepDuration); // Met à jour toutes les `stepDuration` ms
    
    }

    // Cela permet de détecter quand la section #logo devient visible à l'écran 
    // (lorsque 50% de la section est visible grâce à { threshold: 0.5 }).
    // 
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Attente de 500ms avant de lancer
                setTimeout(() => {
                    runAnimation();
                }, 500);
                observer.disconnect();
            }
        });
    }, { threshold: 0.7}); // temps d'attente avant de lancer l'animation

    // Lorsque cet élément entre dans la vue (grâce à l'observateur), l'animation est lancée.
    const target = document.querySelector('#logo');
    if (target) {
        observer.observe(target);
    }
}
