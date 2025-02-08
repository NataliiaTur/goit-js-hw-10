'use strict'; 

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let countdownInterval = null;

startButton.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: "Помилка",
        message: "Please choose a date in the future",
        position: "topRight",
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};


flatpickr(input, options);


function updateTimer() {
  const currentTime = new Date();
  const timeDiff = userSelectedDate - currentTime;

  if (timeDiff <= 0) {
    clearInterval(countdownInterval);
    resetTimerDisplay();
    startButton.disabled = true;
    input.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDiff);

  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}


function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}


function resetTimerDisplay() {
  daysSpan.textContent = "00";
  hoursSpan.textContent = "00";
  minutesSpan.textContent = "00";
  secondsSpan.textContent = "00";
}


startButton.addEventListener("click", () => {
  if (!userSelectedDate) return;

  startButton.disabled = true;
  input.disabled = true;
  startButton.classList.add("active");

  updateTimer();
  countdownInterval = setInterval(() => {
    updateTimer();

    if (userSelectedDate - new Date() <= 0) {
      clearInterval(countdownInterval);
      startButton.disabled = true;
      input.disabled = false;
      startButton.classList.remove("active");
    }
  }, 1000);
});

