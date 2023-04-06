import { createSlice } from "@reduxjs/toolkit";

export const converterSlice = createSlice({
  name: "converter",
  initialState: {
    convert: [],
    sourceCurrency: "",
    targetCurrency: "",
    currencySum: "",
    convertedSum: "",
    sourceCurrencyValue: "",
    targetCurrencyValue: "",
  },
  reducers: {
    sortDataArr(state, action) {
      state.convert = action.payload;
    },
    addTableState(state, action) {
      const date = new Date();
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);
      const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
      state.convertedSum = (
        (state.sourceCurrency * state.currencySum) /
        state.targetCurrency
      ).toFixed(2);
      state.convert.push({
        currencySum: state.currencySum,
        convertedSum: state.convertedSum,
        dateConverted: formattedDate,
        sourceCurrencyValue: state.sourceCurrencyValue,
        targetCurrencyValue: state.targetCurrencyValue,
      });
    },
    setSourceCurrency(state, action) {
      state.sourceCurrency = action.payload;
    },
    setSourceCurrencyValue(state, action) {
      state.sourceCurrencyValue = action.payload;
    },
    setTargetCurrencyValue(state, action) {
      state.targetCurrencyValue = action.payload;
    },
    setTargetCurrency(state, action) {
      state.targetCurrency = action.payload;
    },
    setCurrencySum(state, action) {
      state.currencySum = action.payload;
    },
  },
});

export const {
  addTableState,
  setSourceCurrency,
  setTargetCurrency,
  setCurrencySum,
  setDateConert,
  setSourceCurrencyValue,
  setTargetCurrencyValue,
  sortDataArr,
} = converterSlice.actions;
export default converterSlice.reducer;
