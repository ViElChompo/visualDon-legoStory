'use strict';

export function timer() {
    const start = Date.now();
    console.log('Starting timer now');

    setTimeout(() => {
        const millis = Date.now() - start;
        console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
    }, 6000)
}