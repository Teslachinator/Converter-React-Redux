import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortDataArr } from "../store/converterSlice";
import "./tableHistory.css";

const TableHistory = () => {
  const { convert } = useSelector((state) => state.converter);
  const [direction, setDirection] = useState(true);
  const dispatch = useDispatch();
  const copyData = convert.concat();

  const sortTable = (e) => {
    if (direction) {
      copyData.sort((a, b) => {
        if (e === "currencySum" || e === "convertedSum") return a[e] - b[e];
        else return a[e] > b[e] ? 1 : -1;
      });
    } else {
      copyData.reverse((a, b) => {
        if (e === "currencySum" || e === "convertedSum") return a[e] - b[e];
        else return a[e] > b[e] ? 1 : -1;
      });
    }

    dispatch(sortDataArr(copyData));
    setDirection(!direction);
  };
  return (
    <section className="tableHistory table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th
              onClick={() => {
                sortTable("sourceCurrencyValue");
              }}
            >
              Исходная валюта
            </th>
            <th
              onClick={() => {
                sortTable("targetCurrencyValue");
              }}
            >
              Целевая валюта
            </th>
            <th
              onClick={() => {
                sortTable("currencySum");
              }}
            >
              Сумма в исходной валюте
            </th>
            <th
              onClick={() => {
                sortTable("convertedSum");
              }}
            >
              Конвертированная сумма
            </th>
            <th
              onClick={() => {
                sortTable("dateConverted");
              }}
            >
              Дата конвертации
            </th>
          </tr>
        </thead>
        <tbody>
          {convert.map((table, index) => (
            <tr key={index}>
              <td>{table.sourceCurrencyValue}</td>
              <td>{table.targetCurrencyValue}</td>
              <td>{table.currencySum}</td>
              <td>{table.convertedSum}</td>
              <td>{table.dateConverted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableHistory;
