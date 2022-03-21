const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOTEL_MIN_PRICE = 3000;
const HOUSE_MIN_PRICE = 5000;
const PALACE_MIN_PRICE = 10000;
const RENT_MAX_PRICE = 1000000;

const adForm = document.querySelector('.ad-form');
const adFormInputs = adForm.querySelectorAll('fieldset'); 
const adFormTitle = adForm.querySelector('#title');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const roomQuantity = adForm.querySelector('#room_number');
const guestsQuantity = adForm.querySelector('#capacity');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');
const fillAdFormAddress = adForm.querySelector('#address');

const filterForm = document.querySelector('.map__filters');

const filterFormFilters = filterForm.querySelectorAll('select');
const filterFormFeatures = filterForm.querySelectorAll('fieldset');

function pageInactive() {
    adForm.classList.add('ad-form--disabled');
    adFormInputs.forEach((input) => input.setAttribute('disabled','disabled'));
    filterForm.classList.add('map__filters--disabled');
    filterFormFilters.forEach((input) => input.setAttribute('disabled','disabled'));
    filterFormFeatures.forEach((input) => input.setAttribute('disabled','disabled'));
    
}

function pageActive() {
    adForm.classList.remove('ad-form--disabled');
    adFormInputs.forEach((input) => input.removeAttribute('disabled','disabled'));
    filterForm.classList.remove('map__filters--disabled');
    filterFormFilters.forEach((input) => input.removeAttribute('disabled','disabled'));
    filterFormFeatures.forEach((input) => input.removeAttribute('disabled','disabled'));
}

export { pageInactive, pageActive }


function setMinPrice() {
    switch (adFormType.value) {
        case 'bungalow':
            adFormPrice.min = BUNGALOW_MIN_PRICE;
            adFormPrice.placeholder = BUNGALOW_MIN_PRICE;
        break;
        case 'flat':
            adFormPrice.min = FLAT_MIN_PRICE;
            adFormPrice.placeholder = FLAT_MIN_PRICE;
        break;
        case 'hotel':
            adFormPrice.min = HOTEL_MIN_PRICE;
            adFormPrice.placeholder = HOTEL_MIN_PRICE;
        break;
        case 'house':
            adFormPrice.min = HOUSE_MIN_PRICE;
            adFormPrice.placeholder = HOUSE_MIN_PRICE;
        break;
        case 'palace':
            adFormPrice.min = PALACE_MIN_PRICE;
            adFormPrice.placeholder = PALACE_MIN_PRICE;
        break;
    }
}
setMinPrice();

function setRoomAndGuests() {
    switch(roomQuantity.value) {
        case '1': 
            guestsQuantity[0].setAttribute('disabled', '');
            guestsQuantity[1].setAttribute('disabled', '');
            guestsQuantity[2].removeAttribute('disabled', '');
            guestsQuantity[3].setAttribute('disabled', '');
            guestsQuantity.value = guestsQuantity[2].value;
        break;
        case '2': 
            guestsQuantity[0].setAttribute('disabled', '');
            guestsQuantity[1].removeAttribute('disabled', '');
            guestsQuantity[2].removeAttribute('disabled', '');
            guestsQuantity[3].setAttribute('disabled', '');
            guestsQuantity.value = guestsQuantity[2].value;
        break;
        case '3': 
            guestsQuantity[0].removeAttribute('disabled', '');
            guestsQuantity[1].removeAttribute('disabled', '');
            guestsQuantity[2].removeAttribute('disabled', '');
            guestsQuantity[3].setAttribute('disabled', '');
            guestsQuantity.value = guestsQuantity[2].value;
        break;
        case '100': 
            guestsQuantity[0].setAttribute('disabled', '');
            guestsQuantity[1].setAttribute('disabled', '');
            guestsQuantity[2].setAttribute('disabled', '');
            guestsQuantity[3].removeAttribute('disabled', '');
            guestsQuantity.value = guestsQuantity[3].value;
        break;
    }
}
setRoomAndGuests()

adFormTimeIn.addEventListener('change', () => {
    adFormTimeOut.value = adFormTimeIn.value;
})

adFormTimeOut.addEventListener('change', () => {
    adFormTimeIn.value = adFormTimeOut.value;
})

adFormType.addEventListener('change', () => {
    setMinPrice();
    adFormPrice.max = RENT_MAX_PRICE;
})

roomQuantity.addEventListener('change', () => {
    setRoomAndGuests();
})

function checkFormTitle() {
    if (adFormTitle.validity.valueMissing) {
        adFormTitle.setCustomValidity('Обязательное поле');
    } else if (adFormTitle.validity.tooLong) {
        adFormTitle.setCustomValidity(`Максимальная длина названия — 100 символов. Сейчас длина — ${adFormTitle.value.length}`);
        } else if (adFormTitle.value.length < 30) {
            adFormTitle.setCustomValidity(`Минимальная длина названия — 30 символов. Сейчас длина — ${adFormTitle.value.length}`)
        } else { 
            return true}
}
function checkAdForm() {
    adForm.addEventListener('submit', (evt) => {
        if (checkFormTitle()) {
            evt.preventDefault();
            console.log('можно отправлять');
        } else {
            evt.preventDefault();
            console.log('нельзя отправлять');
        }
        
    })
}
checkAdForm();



export { fillAdFormAddress };