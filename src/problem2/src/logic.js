import { currencyData } from './data.js';

export function handleFormSubmit(event) {
  event.preventDefault();
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = document.getElementById('amount').value;
  const errorMessage = document.getElementById('errorMessage');

  if (!fromCurrency || !toCurrency || !amount) {
    errorMessage.textContent = 'Please fill out all fields.';
    return;
  }

  if (fromCurrency === toCurrency) {
    errorMessage.textContent = 'Please select different currencies to swap.';
    return;
  }

  const fromCurrencyData = currencyData.find(currency => currency.currency === fromCurrency);
  const toCurrencyData = currencyData.find(currency => currency.currency === toCurrency);

  if (!fromCurrencyData || !toCurrencyData) {
    errorMessage.textContent = 'Currency data not found.';
    return;
  }

  const convertedAmount = (amount * fromCurrencyData.price) / toCurrencyData.price;
  errorMessage.textContent = '';
  alert(`Swapping ${amount} ${fromCurrency} to ${convertedAmount.toFixed(2)} ${toCurrency}`);
}

export function validateAmountInput(event) {
  const amountInput = event.target;
  const errorMessage = document.getElementById('errorMessage');
  if (isNaN(amountInput.value) || amountInput.value < 0) {
    amountInput.classList.add('error');
    errorMessage.textContent = 'Please enter a valid number.';
  } else {
    amountInput.classList.remove('error');
    errorMessage.textContent = '';
  }
}