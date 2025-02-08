'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[type="number"][name="delay"]');
const inputFullfilled = document.querySelector('input[type="radio"][name="state"][value="fulfilled"]');
const inputRejected = document.querySelector('input[type="radio"][name="state"][value="rejected"]');

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const selectedDelay = +inputDelay.value.trim(); 

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => { 
            if (inputFullfilled.checked) { 
                resolve(`✅ Fulfilled promise in ${selectedDelay}ms`);
            } else if (inputRejected.checked) {
                reject(`❌ Rejected promise in ${selectedDelay}ms`);
            }
        }, selectedDelay);
    });

    promise
        .then((message) => {
            iziToast.show({
                message: message,
                messageColor: 'white',
                position: "topRight",
                backgroundColor: "green",
            });
        })
        .catch((error) => {
            iziToast.error({
                message: error, 
                messageColor: 'white',
                position: "topRight",
                backgroundColor: "red",
            });
        });
});







