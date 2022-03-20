import { bookingArray } from './data.js'
import { cardsArray } from './data.js';
import { pageInactive, pageActive } from './form.js'


const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(cardsArray[1]);

pageInactive();
pageActive();


const user = {};
[user.id, user.tel] = '00023/+7 (999) 807-75-11'.split('/');
console.log(user);