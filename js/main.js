import { bookingArray, cardsArray } from './data.js';
import { pageInactive, pageActive } from './form.js'
pageInactive();

const mapCanvas = document.querySelector('#map-canvas');
/*const createMapPopup = (point) => {
    const popupTemplate = document.querySelector('#card').content.querySelector('popup');
};*/

const map = L.map('map-canvas')
    .on('load', () => {
        pageActive();
    })
    .setView(
        {lat: 35.658581, lng: 139.745438}, 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors', },)
    .addTo(map);

const mainPinIcon = L.icon({iconUrl: '../img/main-pin.svg', iconSize: [52, 52], iconAnchor: [26, 52]});
const mainPinMarker = L.marker({lat: 35.658581, lng: 139.745438}, {draggable: true, icon: mainPinIcon});
mainPinMarker.addTo(map);

const pinIcon = L.icon({iconUrl: '../img/pin.svg', iconSize: [40, 40], iconAnchor: [20, 40]});


bookingArray.forEach((array, index) => {
    const bookingLat = bookingArray[index].location.lat;
    const bookingLng = bookingArray[index].location.lng;
    const pinMarker = L.marker({lat: bookingLat, lng: bookingLng}, {draggable: false, icon: pinIcon});
    pinMarker.addTo(map);
    pinMarker.bindPopup(cardsArray[index]);
})

const adForm = document.querySelector('.ad-form');
const fillAdFormAddress = adForm.querySelector('#address');

function fillAdFormAdress() {
    mainPinMarker.on('moveend', (evt) => {
        const lat = evt.target.getLatLng().lat;
        fillAdFormAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
    })
};
fillAdFormAdress();