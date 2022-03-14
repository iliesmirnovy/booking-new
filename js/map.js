"use strict"

let map = document.querySelector('.map');
map.classList.remove('map--faded');


let offersArray = [];
let offersTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
let offersType = ['palace', 'flat', 'house', 'bungalo'];
let offersCheckIn = ['12:00', '13:00', '14:00'];
let offersCheckOut = ['12:00', '13:00', '14:00'];
let offersFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let offersFeaturesRandom = [];
let offersPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
let offersRoomsLimit = 5;
let offersAvatarsLimit = 8;
let priceLimit = 100000;
let guestsLimit = Math.ceil(Math.random()*10);

let offersQuantity = 8;
let mapWidth = document.querySelector('.map').offsetWidth;

function generateRandomFeatures() {
    for (let i = Math.floor(Math.random()*offersFeatures.length); i < offersFeatures.length; i++) {
        offersFeaturesRandom.push(offersFeatures[i]);
    }
    return offersFeaturesRandom;
}

function generateOffersArray(quantity) {
    for (let i = 0; i < quantity; i++) {
        let offerObject = 
        {
            'author': {
                'avatar': 'img/avatars/user0' + Math.ceil(Math.random()*offersAvatarsLimit) + '.png'
            },
            'offer': {
                'title': offersTitle[Math.floor(Math.random()*offersTitle.length)],
                'adress': Math.floor(Math.random()*600).toString() + ', ' + Math.floor(Math.random()*350).toString(),
                'price': Math.round(Math.random()*priceLimit),
                'type': offersType[Math.floor(Math.random()*offersType.length)],
                'rooms': Math.ceil(Math.random()*offersRoomsLimit),
                'guests': guestsLimit,
                'checkin': offersCheckIn[Math.floor(Math.random()*offersCheckIn.length)],
                'checkout': offersCheckOut[Math.floor(Math.random()*offersCheckOut.length)],
                'features': '',
                'description': '',
                'photos': offersPhotos[Math.floor(Math.random()*offersPhotos.length)],
                'location': {
                    'x': Math.floor(Math.random() * (mapWidth)),
                    'y': Math.floor(Math.random() * (630-130)+120)
                }
            }
        }
    offersArray.push(offerObject);
    }

    return offersArray;
}

let mapCardTemplate = document.querySelector('.map__template').content.querySelector('.map__card');
let mapPinTemplate = document.querySelector('.map__template').content.querySelector('.map__pin');

// сгенерировать массив данных
// создать функцию создания карточки 
// циклом сформировать карточки из данных массива

function createPinElement(array) {
    let cardButton = mapPinTemplate.cloneNode(true);
    let cardButtonImg = cardButton.querySelector('img');
    
    let buttonLocation = cardButton;
    
    buttonLocation.style.left = array.offer.location.x + 'px';
    buttonLocation.style.top = array.offer.location.y + 'px';
    cardButtonImg.src = array.author.avatar;
    cardButtonImg.alt = array.offer.title;

    return cardButton;
}

function createMapPins() {
    let fragment = document.createDocumentFragment();
    let cardsArray = generateOffersArray(offersQuantity);
    
    for (let i = 0; i < offersQuantity; i++) {
        let card = createPinElement(cardsArray[i]);
        fragment.appendChild(card);
    }

    return fragment;
}

function createMapCard() {
    let array = generateOffersArray(offersQuantity)[0];
    let cardElement = mapCardTemplate.cloneNode(true);

    let cardAvatar = cardElement.querySelector('.popup__avatar');
    let cardTitle = cardElement.querySelector('h3');
    let cardAdress = cardElement.querySelector('p small');
    let cardPrice = cardElement.querySelector('.popup__price');
    let cardType = cardElement.querySelector('.popup__type');
    let cardRoomsAndGuests = cardElement.querySelector('.popup__text--capacity');
    let cardCheckInAndOut = cardElement.querySelector('.popup__text--time');
    let cardFeatures = cardElement.querySelector('.popup__features');
    let cardDescription = cardElement.querySelector('.popup__description');
    let cardPhotos = cardElement.querySelectorAll('.popup__pictures li img');

    cardAvatar.src = array.author.avatar;
    cardTitle.textContent = array.offer.title;
    cardAdress.textContent = array.offer.adress;
    cardPrice.textContent = array.offer.price + ' ₽/ночь';

    if (array.offer.type === 'palace') {
        array.offer.type = 'Дворец';
    } else if (array.offer.type === 'house') {
        array.offer.type = 'Дом';
    } else if (array.offer.type === 'flat') {
        array.offer.type = 'Квартира';
    } else {
        array.offer.type = 'Бунгало';
    }

    cardType.textContent = array.offer.type;
    cardRoomsAndGuests.textContent = array.offer.rooms + ' комнаты для ' + array.offer.guests + ' гостей';
    cardCheckInAndOut.textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
    
    let featuresArray = generateRandomFeatures();

    for (let i = 0; i < featuresArray.length; i++) {
        let featureCreate = document.createElement('li');
        featureCreate.classList.add('feature', 'feature--' + featuresArray[i]);
        cardFeatures.appendChild(featureCreate);
    }


    cardDescription.textContent = array.offer.description;

    cardPhotos.textContent = array.offer.photos;

    let cardPhotosList = cardElement.querySelector('.popup__pictures');

    for (let i = 0; i < offersPhotos.length; i++) {
        let cardPhotosElement = cardPhotosList.querySelector('li').cloneNode(true);
        let cardPhotosElementImg = cardPhotosElement.querySelector('img');
        cardPhotosElementImg.src = offersPhotos[i];
        cardPhotosList.appendChild(cardPhotosElement);
    }

    return cardElement;
}

let mapPinsLocation = document.querySelector('.map__pins');
let mapCardLocation = document.querySelector('.map');

mapPinsLocation.appendChild(createMapPins());
mapCardLocation.appendChild(createMapCard());



let mainForm = document.querySelector('.notice__form');
mainForm.classList.remove('notice__form--disabled');

