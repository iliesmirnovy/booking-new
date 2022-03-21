// import { cardsArray } from './data.js';
import {pageInactive, pageActive, fillAdFormAddress} from './form.js';

const map = L.map('map-canvas');
const mainPinIcon = L.icon({iconUrl: '../img/main-pin.svg', iconSize: [52, 52], iconAnchor: [26, 52]});
const mainPinMarker = L.marker({lat: 35.658581, lng: 139.745438}, {draggable: true, icon: mainPinIcon});
const pinIcon = L.icon({iconUrl: '../img/pin.svg', iconSize: [40, 40], iconAnchor: [20, 40]});
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const card = cardTemplate.cloneNode(true);
const offerTitle = card.querySelector('.popup__title');
const offerAddress = card.querySelector('.popup__text--address');
const offerPrice = card.querySelector('.popup__text--price');
const offerType = card.querySelector('.popup__type');
const offerCapacity = card.querySelector('.popup__text--capacity');
const offerCheckInOut = card.querySelector('.popup__text--time');
const offerDesription = card.querySelector('.popup__description');
const offerPhotos = card.querySelector('.popup__photos ');
const authorAvatar = card.querySelector('.popup__avatar');
const cardsArray = [];

pageInactive();


function drawMap() {
    map.on('load', () => {
        pageActive();
    })
    .setView(
        {lat: 35.658581, lng: 139.745438}, 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors', },)
    .addTo(map);
}

function createMainPin() {
    mainPinMarker.addTo(map);
}


function createPins(array) {
    array.forEach((offer, index) => {
        const bookingLat = offer.location.lat;
        const bookingLng = offer.location.lng;
        const pinMarker = L.marker({lat: bookingLat, lng: bookingLng}, {draggable: false, icon: pinIcon});
        pinMarker.addTo(map);
        pinMarker.bindPopup(cardsArray[index]);
    })
}

function fillAdFormAdress() {
    mainPinMarker.on('moveend', (evt) => {
        const lat = evt.target.getLatLng().lat;
        fillAdFormAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
    })
};

function createPinsPopup(array) {
    array.forEach((offerData) => {
        
        const card = cardTemplate.cloneNode(true);
        const offerTitle = card.querySelector('.popup__title');
        const offerAddress = card.querySelector('.popup__text--address');
        const offerPrice = card.querySelector('.popup__text--price');
        const offerType = card.querySelector('.popup__type');
        const offerCapacity = card.querySelector('.popup__text--capacity');
        const offerCheckInOut = card.querySelector('.popup__text--time');
        const offerDesription = card.querySelector('.popup__description');
        const offerPhotos = card.querySelector('.popup__photos ');
        const authorAvatar = card.querySelector('.popup__avatar');

        offerTitle.textContent = offerData.offer.title;
        offerAddress.textContent = offerData.offer.address;
        offerPrice.textContent = `${offerData.offer.price} ₽/ночь`;
        
        switch (offerData.offer.type) {
            case 'flat':
                offerType.textContent = 'Квартира';
            break;
            case 'bungalow':
                offerType.textContent = 'Бунгало';
            break;
            case 'house':
                offerType.textContent = 'Дом';
            break;
            case 'palace':
                offerType.textContent = 'Дворец';
            case 'hotel':
                offerType.textContent = 'Отель';
            break;
            default:
                offerType.textContent = 'Непонятно!';
        }
        
        let roomText = '';
        switch (offerData.offer.rooms) {
            case 1:
                roomText = 'комната';
            break;
            case 2:
            case 3:
            case 4:
                roomText = 'комнаты';
            break;
            default: 
                roomText = 'комнат';
        }
        let guestText = ''
        switch (offerData.offer.guests) {
            case 1:
                guestText = 'гостя';
            break;
            default: 
                guestText = 'гостей';
        }
        offerCapacity.textContent = `${offerData.offer.rooms} ${roomText} для ${offerData.offer.guests} ${guestText}`;
        offerCheckInOut.textContent = `Заезд после ${offerData.offer.checkin}, выезд до ${offerData.offer.checkout}`;
        
        
        const offerFeatureList = card.querySelector('.popup__features');
        const offerFeatureElements = card.querySelectorAll('.popup__feature');
        if (offerData.offer.features) {
            const offerFeatureModifier = offerData.offer.features.map((feature) => 'popup__feature--' + feature);
            offerFeatureElements.forEach((feature) => {
                if (!offerFeatureModifier.includes(feature.classList[1])) {
                    feature.remove();
                }
            });
        } else {
            offerFeatureList.remove();
        }

        offerData.offer.description ? offerDesription.textContent = offerData.offer.description : offerDesription.remove();

        const offerImgElement = offerPhotos.querySelector('.popup__photo');
        offerPhotos.innerHTML = '';
        offerData.offer.photos.forEach((img) => {
            const photo = offerImgElement.cloneNode();
            photo.src = img;
            offerPhotos.appendChild(photo);
        })
        authorAvatar.src = offerData.author.avatar;

        cardsArray.push(card);
    })
}

export {createPinsPopup, createPins};



drawMap();
createMainPin();
fillAdFormAdress();