import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CurrencyBlock from "./Components/CurrencyBlock";
import { useDispatch } from "react-redux";
import TableHistory from "./Components/TableHistory";
import { addTableState } from "./store/converterSlice";
import { Box, Button } from "@mui/material";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [rates, setRates] = useState();
  const dispatch = useDispatch();

  const fetchData = async () => {
    await axios
      .get("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((res) => {
        setRates(Object.values(res.data.Valute));
      })
      .catch((err) => {
        console.warn(err);
        alert("ошибка");
      });
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addToTable = (e) => {
    e.preventDefault();
    dispatch(addTableState(e.target.value));
  };

  return (
    <div className="App">
      <header>
        <h2>Конвертер валют</h2>
        <Box component="form" className="currency card" onSubmit={addToTable}>
          <CurrencyBlock rates={rates} isLoading={isLoading} />
          <Button
            variant="contained"
            type="submit"
            className="btn btn-outline-secondary"
          >
            Конвертировать
          </Button>
        </Box>
      </header>
      <TableHistory />
    </div>
  );
}

export default App;
