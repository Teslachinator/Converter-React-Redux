import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortDataArr } from "../store/converterSlice";
import "./tableHistory.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

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
      <TableContainer className="">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => {
                  sortTable("sourceCurrencyValue");
                }}
              >
                Исходная валюта
              </TableCell>
              <TableCell
                onClick={() => {
                  sortTable("targetCurrencyValue");
                }}
              >
                Целевая валюта
              </TableCell>
              <TableCell
                onClick={() => {
                  sortTable("currencySum");
                }}
              >
                Сумма в исходной валюте
              </TableCell>
              <TableCell
                onClick={() => {
                  sortTable("convertedSum");
                }}
              >
                Конвертированная сумма
              </TableCell>
              <TableCell
                onClick={() => {
                  sortTable("convertedSum");
                }}
              >
                Дата конвертации
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {convert.map((table, index) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={index}
              >
                <TableCell>{table.sourceCurrencyValue}</TableCell>
                <TableCell>{table.targetCurrencyValue}</TableCell>
                <TableCell>{table.currencySum}</TableCell>
                <TableCell>{table.convertedSum}</TableCell>
                <TableCell>{table.dateConverted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* <tbody>
          {convert.map((table, index) => (
            <tr key={index}>
              <td>{table.sourceCurrencyValue}</td>
              <td>{table.targetCurrencyValue}</td>
              <td>{table.currencySum}</td>
              <td>{table.convertedSum}</td>
              <td>{table.dateConverted}</td>
            </tr>
          ))}
        </tbody> */}
      </TableContainer>
    </section>
  );
};

export default TableHistory;
