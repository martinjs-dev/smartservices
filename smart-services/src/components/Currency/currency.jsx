import React, { useEffect, useState } from "react";
import axios from "axios";

const Convert_currency = ({ onSearchQueryChange }) => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(0);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/d7e1e73e6ba6bf951261d4e3/latest/USD`
        );
        setRates(response.data.conversion_rates);
      } catch (error) {
        console.error("Erreur lors de la récupération des taux", error);
      }
    };

    fetchRates();
  }, []);

  const convert = () => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = (rates[toCurrency] / rates[fromCurrency]) * amount;
      setResult(rate);
      onSearchQueryChange(amount + " " + fromCurrency + " to " + toCurrency);
    }
  };

  return (
    <div>
      <h3>Convertir des devises</h3>
      <div border-orange>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span>to</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={convert}>Convertir</button>
      {result !== 0 && <p>Résultat : {result.toFixed(2)} {toCurrency}</p>}
    </div>
  );
};

export default Convert_currency;