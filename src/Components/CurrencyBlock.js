import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSourceCurrency,
  setTargetCurrency,
  setCurrencySum,
  setSourceCurrencyValue,
  setTargetCurrencyValue,
} from "../store/converterSlice";
import {
  Box,
  Container,
  Input,
  InputLabel,
  NativeSelect,
  Select,
} from "@mui/material";

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
    <Box m={2} sx={{ gap: 2 }}>
      <label>
        Введите сумму:
        <Input
          sx={{ ml: 2 }}
          required
          className="form-control"
          type="number"
          value={currencySum}
          onChange={(e) => {
            dispatch(setCurrencySum(e.target.value));
          }}
        />
      </label>

      <label>Исходная валюта</label>
      <NativeSelect
        // sx={{ pl: 2, backgroundColor:  }}
        required
        onChange={(e) => handleSourceCurrencyChange(e)}
        className="sourceCurrency form-select "
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
      </NativeSelect>

      <label>Целевая валюта</label>
      <NativeSelect
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
      </NativeSelect>
    </Box>
  );
};

export default CurrencyBlock;
