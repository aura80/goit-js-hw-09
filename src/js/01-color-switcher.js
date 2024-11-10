// function to set a random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// selecting elements
const bodyElement = document.querySelector('body');
const startElement = document.querySelector('button[data-start]');
const stopElement = document.querySelector('button[data-stop]');

// setting a variable for the interval id
let intervalStartId = null;

// adding event on start button
startElement.addEventListener('click', () => {
  //   e.preventDefault();

  // if an interval is running we clear it
  if (intervalStartId !== null) {
    clearInterval(intervalStartId);
  }

  // disabling the start button after start
  startElement.disabled = true;

  // changing color at every 1000 ms - 1 s
  // intervalStartId it is set to be cleared at a later later time
  intervalStartId = setInterval(() => {
    bodyElement.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

// adding event on stop button
stopElement.addEventListener('click', () => {
  // interval cleared
  clearInterval(intervalStartId);
  // indicates that it is no other interval running
  // avoids duplicate intervals and misinterpretation at startclick event
  intervalStartId = null;
  // reactivation of the start button
  startElement.disabled = false;
});
