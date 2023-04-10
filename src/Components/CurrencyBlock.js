import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSourceCurrency,
  setTargetCurrency,
  setCurrencySum,
  setSourceCurrencyValue,
  setTargetCurrencyValue,
} from "../store/converterSlice";
import { Box, TextField } from "@mui/material";

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
    <Box p={2} sx={{ gap: 2 }}>
      <label>Введите сумму: </label>
      <TextField
        pl={2}
        variant="outlined"
        required
        className="control"
        type="number"
        value={currencySum}
        onChange={(e) => {
          dispatch(setCurrencySum(e.target.value));
        }}
      />

      <label>Исходная валюта</label>
      <TextField
        select
        variant="outlined"
        required
        SelectProps={{
          native: true,
        }}
        onChange={(e) => handleSourceCurrencyChange(e)}
        className="sourceCurrency form-select"
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
      </TextField>

      <label>Целевая валюта</label>
      <TextField
        select
        variant="outlined"
        required
        SelectProps={{
          native: true,
        }}
        className="targetCurrency form-select"
        value={targetCurrency}
        onChange={handleTargetCurrencyChange}
      >
        <option style={{ padding: 5 }} value="">
          Выберите валюту
        </option>
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
      </TextField>
    </Box>
  );
};

export default CurrencyBlock;
