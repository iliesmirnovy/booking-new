import { getRandomIntFromRange } from './util.js';

const BOOKING_ARRAY_QUANTITY = 10;
const BOOKING_MAX_PRICE = 20000;
const BOOKING_MAX_ROOMS = 4;
const BOOKING_MAX_GUESTS_PER_ROOM = 2;
const LOCATION_MIN_LAT = 35.65000;
const LOCATION_MAX_LAT = 35.70000;
const LOCATION_MIN_LNG = 139.70000;
const LOCATION_MAX_LNG = 139.80000;



function createBookingObject() {
    let bookingObject = {};
    const avatarInt = () => {
        let avatarInt = getRandomIntFromRange(1, BOOKING_ARRAY_QUANTITY + 1);
        return avatarInt < 10 ? avatarInt = '0' + avatarInt : avatarInt;
    };
    const typeArray = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
    const checkInArray = ['12:00','13:00','14:00'];
    const checkOutArray = ['12:00','13:00','14:00'];
    const featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    const photosArray = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


    bookingObject.author = {
        avatar: `img/avatars/user${avatarInt()}.png`,
    }

    bookingObject.price = getRandomIntFromRange(0, BOOKING_MAX_PRICE);
    bookingObject.type = typeArray[getRandomIntFromRange(0, typeArray.length - 1)];
    bookingObject.rooms = getRandomIntFromRange(1, BOOKING_MAX_ROOMS);
    bookingObject.guests = bookingObject.rooms * getRandomIntFromRange(1, BOOKING_MAX_GUESTS_PER_ROOM);
    bookingObject.checkIn = checkInArray[getRandomIntFromRange(0, checkInArray.length - 1)];
    bookingObject.checkOut = checkOutArray[getRandomIntFromRange(0, checkOutArray.length - 1)];
    bookingObject.features = featuresArray.slice(0, getRandomIntFromRange(1, featuresArray.length - 1));
    bookingObject.description = 'Описание того, что можно снять';
    bookingObject.photos = photosArray.slice(0, getRandomIntFromRange(1, photosArray.length));

    bookingObject.location = {
        lat: (Math.random() * (LOCATION_MAX_LAT - LOCATION_MIN_LAT) + LOCATION_MIN_LAT).toFixed(5),
        lng: (Math.random() * (LOCATION_MAX_LNG - LOCATION_MIN_LNG) + LOCATION_MAX_LNG).toFixed(5),
    }

    bookingObject.offer = {
        title: 'Название объекта для аренды',
        address: bookingObject.location.lat + ', ' + bookingObject.location.lng,
    }
    return bookingObject;
}


const bookingArray = Array.from({length: BOOKING_ARRAY_QUANTITY}, createBookingObject);


export {bookingArray};



const cardTemplate = document.querySelector('#card');
const cardTemplateElement = cardTemplate.content.querySelector('.popup');

const cardsArray = [];

bookingArray.forEach((offerData) => {
    const card = cardTemplateElement.cloneNode(true);

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
    offerPrice.textContent = `${offerData.price} ₽/ночь`;
    
    switch (offerData.type) {
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
    switch (offerData.rooms) {
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
    switch (offerData.guests) {
        case 1:
            guestText = 'гостя';
        break;
        default: 
            guestText = 'гостей';
    }
    offerCapacity.textContent = `${offerData.rooms} ${roomText} для ${offerData.guests} ${guestText}`;
    offerCheckInOut.textContent = `Заезд после ${offerData.checkIn}, выезд до ${offerData.checkOut}`;
    
    const offerFeaturesList = card.querySelector('.popup__features');
    const offerFeatureElements = card.querySelectorAll('.popup__feature');
    const offerFeatureModifier = offerData.features.map((feature) => 'popup__feature--' + feature)
    offerFeatureElements.forEach((feature) => {
        if (!offerFeatureModifier.includes(feature.classList[1])) {
            feature.remove();
        }
    })

    offerData.description ? offerDesription.textContent = offerData.description : offerDesription.remove();
    
    const offerImgElement = offerPhotos.querySelector('.popup__photo');
    offerPhotos.innerHTML = '';
    offerData.photos.forEach((img) => {
        const photo = offerImgElement.cloneNode();
        photo.src = img;
        offerPhotos.appendChild(photo);
    })

    authorAvatar.src = offerData.author.avatar;

    cardsArray.push(card);
})



export { cardsArray };