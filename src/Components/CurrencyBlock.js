import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSourceCurrency,
  setTargetCurrency,
  setCurrencySum,
  setSourceCurrencyValue,
  setTargetCurrencyValue,
} from "../store/converterSlice";

const CurrencyBlock = ({ rates, isLoading }) => {
  const dispatch = useDispatch();
  const { currencySum, sourceCurrency, targetCurrency } = useSelector(
    (state) => state.converter
  );

  const handleSourceCurrencyChange = () => {
    const option = document.querySelector(".sourceCurrency option:checked");
    dispatch(setSourceCurrency(option.value));
    dispatch(setSourceCurrencyValue(option.label));
  };
  const handleTargetCurrencyChange = () => {
    const option = document.querySelector(".targetCurrency option:checked");
    dispatch(setTargetCurrency(option.value));
    dispatch(setTargetCurrencyValue(option.label));
  };

  return (
    <div>
      <label>
        Введите сумму:
        <input
          required
          className="form-control"
          type="number"
          aria-label="Amount (to the nearest dollar)"
          value={currencySum}
          onChange={(e) => {
            dispatch(setCurrencySum(e.target.value));
          }}
        />
      </label>

      <label>
        Исходная валюта
        <select
          required
          onChange={(e) => handleSourceCurrencyChange(e)}
          className="sourceCurrency form-select "
          aria-label="Default select example"
          defaultValue={sourceCurrency.value}
        >
          <option value="">Выберите валюту</option>

          {isLoading ? (
            <option>Загрузка...</option>
          ) : (
            <>
              <option key={"RUB"} value={1}>
                RUB - Российский рубль
              </option>
              {rates.map((currency) => (
                <option value={currency.Value} key={currency.NumCode}>
                  {currency.CharCode} - {currency.Name}
                </option>
              ))}
            </>
          )}
        </select>
      </label>
      <label>
        Целевая валюта
        <select
          required
          className="targetCurrency form-select"
          value={targetCurrency}
          onChange={handleTargetCurrencyChange}
        >
          <option value="">Выберите валюту</option>
          {isLoading ? (
            <option>Загрузка...</option>
          ) : (
            <>
              <option key={"RUB"} value={1}>
                RUB - Российский рубль
              </option>
              {rates.map((currency) => (
                <option value={currency.Value} key={currency.NumCode}>
                  {currency.CharCode} - {currency.Name}
                </option>
              ))}
            </>
          )}
        </select>
      </label>
    </div>
  );
};

export default CurrencyBlock;
