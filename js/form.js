const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOTEL_MIN_PRICE = 3000;
const HOUSE_MIN_PRICE = 5000;
const PALACE_MIN_PRICE = 10000;
const RENT_MAX_PRICE = 1000000;
const ESCAPE_KEY = 27;

const adForm = document.querySelector('.ad-form');
const adFormInputs = adForm.querySelectorAll('fieldset'); 
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


function closePopup(popup) {
    popup.remove();
}



function adFormSendSuccess(){
    const successMessageTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    const successMessage = document.body.appendChild(successMessageTemplate);
    successMessage;
    window.addEventListener('keydown', (evt) => {
        if (evt.keyCode === ESCAPE_KEY) {
            closePopup(successMessage);
        }
    })
    successMessage.addEventListener('click', () => {
        closePopup(successMessage);
    })
}

function adFormSendFail(){
    const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    const errorMessage = document.body.appendChild(errorMessageTemplate);
    errorMessage;
    window.addEventListener('keydown', (evt) => {
        if (evt.keyCode === ESCAPE_KEY) {
            closePopup(errorMessage);
        }
    })
    errorMessage.addEventListener('click', () => {
        closePopup(errorMessage);
    })
}

const setUserFormSubmit = (onSuccess, onFail) => {
    adForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
    
        fetch('https://24.javascript.pages.academy/keksobooking', 
            {
            method: 'POST',
            body: formData,
            },
        )
        .then(() => onSuccess())
        .then(() => adForm.reset())
    })
}

setUserFormSubmit(adFormSendSuccess, adFormSendFail);

const resetFormButton = adForm.querySelector('.ad-form__reset');
resetFormButton.addEventListener('click', () => {
    adForm.reset();
})

export { fillAdFormAddress };