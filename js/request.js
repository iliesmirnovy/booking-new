import {createPins, createPinsPopup} from './map.js';

function getMapData() {
    fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
        createPinsPopup(data.slice(0, 10));
        createPins(data.slice(0, 10));
    })
}

getMapData();