////////////////////////////
//
// Context api den gelen verilerin tablo haline getirildiği component
//
////////////////////////////

import React from "react";
import { useCalculation } from "../context/CalculationContext";
function Table() {
  const { paybackTable } = useCalculation();


  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Taksit No</th>
            <th>Taksit Tutarı</th>
            <th>Ana Para</th>
            <th>Kalan Ana Para</th>
            <th>Kar Tutarı</th>
            <th>BSMV</th>
            <th>KKDF</th>
          </tr>
        </thead>
        <tbody>
          
        {paybackTable.current.slice(1).map((item,index) => {
          return (
            <tr key={index}>
                <td>{item.taksitNo}</td>
                <td>{Number(item.taksitTutari).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>{Number(item.anaPara).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>{Number(item.kalanAnaPara).toFixed(2).replace('-0', '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>{Number(item.karTutari).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>{Number(item.bsmv).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>{Number(item.kkdf).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
            </tr>);
        })}
          
        </tbody>
      </table>
    </div>
  );
}

export default Table;
