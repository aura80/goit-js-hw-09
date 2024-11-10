// import from documentation
import flatpickr from 'flatpickr';
// suplimentary import for style
import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix
import Notiflix from 'notiflix';

// selectors
const inputPicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysSelector = document.querySelector('span[data-days]');
const hoursSelector = document.querySelector('span[data-hours]');
const minutesSelector = document.querySelector('span[data-minutes]');
const secondsSelector = document.querySelector('span[data-seconds]');

// start button disabled for current default date
startButton.disabled = true;

//object with parameters
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    // if a previous date is selected show a window alert and deactivate button
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(inputPicker, options);

// time conversion to days, hours, minutes, seconds
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// at click on start button show the countdown at every 1000 ms
startButton.addEventListener('click', () => {
  const startIntervalId = setInterval(() => {
    // button start disabled at every click and at every input change at 1000 ms
    startButton.disabled = true;

    // current date
    const nowDate = Date.now();
    // date inserted as input
    const pickedDate = new Date(inputPicker.value);
    // difference between inserted date and current date
    const diff = pickedDate - nowDate;

    // if we selected a date before the current one
    if (diff < 0) {
      clearInterval(startIntervalId);

      daysSelector.innerHTML = '00';
      hoursSelector.innerHTML = '00';
      minutesSelector.innerHTML = '00';
      secondsSelector.innerHTML = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    // if less than 10 days are left a '0' is added from left to right
    // new value for days added to daysSelector as innerHTML
    daysSelector.innerHTML = addLeadingZero(days);
    hoursSelector.innerHTML = addLeadingZero(hours);
    minutesSelector.innerHTML = addLeadingZero(minutes);
    secondsSelector.innerHTML = addLeadingZero(seconds);
  }, 1000);
});

// adding '0' to value as string from left to right for two positions
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
