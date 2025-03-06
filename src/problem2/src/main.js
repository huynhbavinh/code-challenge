import './style.css'
import { handleFormSubmit, validateAmountInput } from './logic.js'
import { currencyData } from './data.js'

document.querySelector('#app').innerHTML = `
  <div class="currency-swap-form">
    <h1>Currency Swap</h1>
    <form id="swapForm">
      <div class="form-group">
        <label for="fromCurrency">From:</label>
        <select id="fromCurrency" required>
          <option value="" disabled selected>Select currency</option>
        </select>
      </div>
      <div class="form-group">
        <label for="toCurrency">To:</label>
        <select id="toCurrency" required>
          <option value="" disabled selected>Select currency</option>
        </select>
      </div>
      <div class="form-group">
        <label for="amount">Amount:</label>
        <input type="number" id="amount" required min="0" step="0.01" placeholder="Enter amount">
      </div>
      <button type="submit">Swap</button>
      <div id="errorMessage" class="error-message"></div>
    </form>
  </div>
`

const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');

currencyData.forEach(currency => {
  const option = document.createElement('option');
  option.value = currency.currency;
  option.textContent = currency.currency;
  fromCurrencySelect.appendChild(option.cloneNode(true));
  toCurrencySelect.appendChild(option);
});

document.getElementById('swapForm').addEventListener('submit', handleFormSubmit);
document.getElementById('amount').addEventListener('input', validateAmountInput);