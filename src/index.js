import './sass/main.scss';

import fetchCountries from './fetchCountries';
import countriesListTemplate from './cuntries-list.hbs'
import countryBoxTemplate from './country-box.hbs'

// import pontyfy styles and js
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/mobile/dist/PNotifyMobile.css';
import { error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

var debounce = require('lodash.debounce');

const murkupBox = document.querySelector('.markup-box')
const countryNameField = document.querySelector('[name="countryname"]')

countryNameField.addEventListener('input', debounce(onCountryNameFieldInput, 500))

function onCountryNameFieldInput() {
    fetchCountries(countryNameField.value)
        .then(responseProcessing)
}

function responseProcessing(data) {
    murkupBox.innerHTML = ""
    if (data.length > 10) {
        error({
            title: 'Too many matches found. Please enter more specific query!',
        });
    }
    if (1 < data.length && data.length < 10) {
        const markup = countriesListTemplate(data)
        murkupBox.insertAdjacentHTML('beforeend', markup)
    }
    if (data.length === 1) {
        const markup = countryBoxTemplate(data)
        murkupBox.insertAdjacentHTML('beforeend', markup)
    }
}



