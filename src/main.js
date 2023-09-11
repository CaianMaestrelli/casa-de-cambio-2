import Swal from 'sweetalert2';

const inputCoin = document.getElementById('coin-input');

const titleCoin = document.querySelector('.coins-title');

const listCoins = document.querySelector('.coins');

function fetchCoins(coin) {
  const url = `https://api.exchangerate.host/latest?base=${coin}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (coin !== data.base) {
        Swal.fire(
          'Ops ...',
          'Moeda não existente!',
          'error',
        );
        return false;
      }

      return data.rates;
    });
}

function renderCoins(result) {
  listCoins.innerHTML = '';

  const coinsArray = Object.entries(result);
  console.log(coinsArray);

  coinsArray.forEach((coin) => {
    const TO_FIXED_VALUE = 3;
    const [coinName, coinValue] = coin;

    console.log('coinName', coinName);
    console.log('coinValue', coinValue);

    const li = document.createElement('li');
    li.textContent = `🪙 ${coinName} - ${coinValue.toFixed(TO_FIXED_VALUE)}`;
    listCoins.appendChild(li);
  });
}

function handleSearch(event) {
  event.preventDefault();

  const coin = inputCoin.value.toUpperCase();
  console.log(coin);

  if (!coin) {
    console.log('erro');

    Swal.fire(
      'Ops ...',
      'Você precisa passar uma moeda',
      'error',
    );
    return;
  }

  titleCoin.textContent = `Valores referentes a 1 ${coin}`;

  fetchCoins(coin)
    .then((result) => renderCoins(result));
}

const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', handleSearch);