const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form-header__upload input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const avatarPreviewContainer = document.querySelector('.ad-form-header__preview');

avatarChooser.addEventListener('change', () => {
    const file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((element) => {
        return fileName.endsWith(element);
    })

    if (matches) {
        avatarPreview.style.width = '70px';
        avatarPreview.style.height = '70px';
        avatarPreview.style.borderRadius = '5px';
        avatarPreviewContainer.style.padding = '0px';
        avatarPreview.src = URL.createObjectURL(file);
    }
})


const adPhotoChooser = document.querySelector('.ad-form__photo-container input[type=file]');
const adPhotoPreview = document.querySelector('.ad-form__photo');

adPhotoChooser.addEventListener('change', () => {
    const file = adPhotoChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((element) => {
        return fileName.endsWith(element);
    })

    if (matches) {
        const createAdPhoto = document.createElement('img')
        console.log(createAdPhoto);
        createAdPhoto.style.width = '70px';
        createAdPhoto.style.height = '70px';
        createAdPhoto.style.borderRadius = '5px';

        console.log(createAdPhoto);
        adPhotoPreview.appendChild(createAdPhoto);
        createAdPhoto.src = URL.createObjectURL(file);
    }
})