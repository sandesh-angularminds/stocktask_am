import { createContext, useContext, useEffect, useState } from "react";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  let initialStocks = [
    { id: 1, symbol: "AAPL", currentPrice: 189.12 },
    { id: 2, symbol: "GOOGL", currentPrice: 2763.45 },
    { id: 3, symbol: "AMZN", currentPrice: 3456.78 },
    { id: 4, symbol: "MSFT", currentPrice: 321.54 },
    { id: 5, symbol: "TSLA", currentPrice: 785.9 },
    { id: 6, symbol: "META", currentPrice: 341.22 },
    { id: 7, symbol: "NFLX", currentPrice: 404.67 },
    { id: 8, symbol: "NVDA", currentPrice: 926.88 },
    { id: 9, symbol: "BABA", currentPrice: 123.45 },
    { id: 10, symbol: "ORCL", currentPrice: 106.78 },
    { id: 11, symbol: "INTC", currentPrice: 37.56 },
    { id: 12, symbol: "ADBE", currentPrice: 598.33 },
    { id: 13, symbol: "CRM", currentPrice: 267.99 },
    { id: 14, symbol: "PYPL", currentPrice: 71.45 },
    { id: 15, symbol: "UBER", currentPrice: 69.31 },
    { id: 16, symbol: "DIS", currentPrice: 112.57 },
    { id: 17, symbol: "SONY", currentPrice: 86.1 },
    { id: 18, symbol: "T", currentPrice: 17.89 },
    { id: 19, symbol: "V", currentPrice: 271.33 },
    { id: 20, symbol: "MA", currentPrice: 412.56 },
  ];
  const [stocks, setStock] = useState([]);

  function getRandomVal(min = 10, max = 100) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  function setStockData() {
    let intervalId;
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      let updateStocks = initialStocks.map((item) => {
        return { ...item, currentPrice: getRandomVal() };
      });
      setStock(updateStocks);
    }, 3000);
  }

  useEffect(() => {
    setStock(initialStocks);
    setStockData();
  }, []);

  return (
    <StockContext.Provider value={{ stocks }}>{children}</StockContext.Provider>
  );
};

export const useStock = () => {
  return useContext(StockContext);
};
