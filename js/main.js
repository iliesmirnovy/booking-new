import './map.js';
import {createPins, createPinsPopup} from './map.js';


fetch ('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
        createPinsPopup(offers.slice(0, 10));
        createPins(offers.slice(0, 10));
    })