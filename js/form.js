const adForm = document.querySelector('.ad-form');
const adFormInputs = adForm.querySelectorAll('fieldset'); 
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