import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, onAddStock }) {
  
  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map(stock => <Stock stock={stock} key={stock.id} onStockClick={onAddStock} />)}
    </div>
  );
}

export default StockContainer;
