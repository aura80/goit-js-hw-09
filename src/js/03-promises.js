// import Notiflix
import Notiflix from 'notiflix';

const formElement = document.querySelector('.form');

formElement.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.target.delay.value);
  const step = Number(event.target.step.value);
  const amount = Number(event.target.amount.value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const currentDelay = delay + i * step;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
