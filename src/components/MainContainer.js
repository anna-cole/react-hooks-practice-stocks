import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('Tech')
  const [sort, setSort] = useState('Alphabetically')

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
    .then(r => r.json())
    .then(stocks => setStocks(stocks))
  }, [])

  function handleAddStock(selectedStock) {
    const stockInPortfolio = portfolio.find(stock => stock.id === selectedStock.id)
    if(!stockInPortfolio) {
      setPortfolio([...portfolio, selectedStock]) 
    }  
  }

  function handleDeleteStock(deletedStock) {
    const updatedList = portfolio.filter(stock => stock.id !== deletedStock.id)
    setPortfolio(updatedList)
  }

  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sort === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  let filteredStocks = sortedStocks.filter(stock => stock.type === selectedFilter)

  return (
    <div>
      <SearchBar selectedFilter={selectedFilter} onChangeFilter={e => setSelectedFilter(e.target.value)} sort={sort} onChangeSort={e => setSort(e.target.value)} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onAddStock={handleAddStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onDeleteStock={handleDeleteStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
