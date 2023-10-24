import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ stocks, onDeleteStock }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {stocks.map(stock => <Stock stock={stock} key={stock.id} onStockClick={onDeleteStock} />)}
    </div>
  );
}

export default PortfolioContainer;
