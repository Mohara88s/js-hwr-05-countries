import './sass/main.scss';

import fetchCountries from './fetchCountries';
import countriesListTemplate from './cuntries-list.hbs'
import countryBoxTemplate from './country-box.hbs'

// import pontyfy styles and js
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/mobile/dist/PNotifyMobile.css';
import {error} from '../node_modules/@pnotify/core/dist/PNotify.js';

var debounce = require('lodash.debounce');

const murkupBox = document.querySelector('.markup-box')
const countryNameField = document.querySelector('[name="countryname"]')

countryNameField.addEventListener('input', debounce(onCountryNameFieldInput, 500))

function onCountryNameFieldInput () {
    if (countryNameField.value) {
        fetchCountries(countryNameField.value)
        .then(responseProcessing)
    }
}

function responseProcessing(data) {
    murkupBox.innerHTML = ""
    if (data === 404) {
        pontyfyMassage('Nothing was found for your query!')
        return
    }
    if (data.length > 10) {
        pontyfyMassage('Too many matches found. Please enter more specific query!')
        return
    }
    if (1 < data.length && data.length < 10) {
        const markup = countriesListTemplate(data)
        murkupBox.insertAdjacentHTML('beforeend', markup)
        return
    }
    if (data.length === 1) {
        const markup = countryBoxTemplate(data)
        murkupBox.insertAdjacentHTML('beforeend', markup)
        return
    }
}

function pontyfyMassage(message) {
    error({
            title: `${message}`,
            delay: 1500,
        });
}



