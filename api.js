const BASE_URL = 'https://rebrickable.com/api/v3/lego/'

const apiKey = 'db97da3fb6f1aaa7897fafc0f0af5ecc';

const options = {
    method: 'GET',
    headers: {
        'Authorization': `key ${apiKey}`  // Ajoute la clé API dans l'en-tête
    }
}

const loadJson = (url, options) => fetch(url, options).then((response) => response.json())

const loadSets = () => loadJson(`${BASE_URL}sets/`, options);

export {loadSets}