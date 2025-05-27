import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getData } from "@/services/http-config";
import { SellHoldings } from "./SellHoldings";
import { useStock } from "@/contexts/stock.context";
import { Loader } from "../components/shared/Loader";

export const Holdings = () => {
  const { stocks } = useStock();
  let [holdingsData, setHoldingsData] = useState([]);
  const [selectedStock, setSelectedStock] = useState({});
  const [loader, setLoader] = useState(false);
  const [isSellStock, setIsSellStock] = useState(false);
  async function onSellStocks(stock) {
    setSelectedStock(stock);
    setIsSellStock(true);
  }

  async function getHoldingsDetails() {
    try {
      setLoader(true);
      holdingsData = await getData("/holdings");
      setLoader(false);
      setHoldingsData(holdingsData.data);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    getHoldingsDetails();
  }, []);

  useEffect(() => {
    getData();
    let newData = holdingsData.map((item) => {
      let ele = stocks.filter((el) => {
        if (el.id == item.stockId) {
          return el;
        }
      })[0];
      console.log("ele", ele);
      let pnl = Number(
        +item.quantity * +ele.currentPrice -
          +item.quantity * +item.averageBuyPrice
      ).toFixed(2);
      let currPrice = ele.currentPrice;
      console.log("pnl", pnl, "currprice", currPrice);
      return { ...item, pnl: pnl, currentPrice: currPrice };
    });
    setHoldingsData(newData);
  }, [stocks]);
  useEffect(() => {
    getHoldingsDetails();
  }, [isSellStock]);

  return (
    <div>
      <div className="text-center ">
        <h3 className="text-2xl font-bold mb-3">Your Holdings</h3>
      </div>
      {loader && <Loader />}
      {!loader && (
        <Table>
          {/* <TableCaption>A list of your holdings.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              {/* <TableHead>User id</TableHead> */}
              <TableHead>Symbol</TableHead>
              <TableHead className="text-right w-[180px]">Quantity</TableHead>
              <TableHead className="text-right w-[180px]">
                Average Price
              </TableHead>
              <TableHead className="text-right w-[180px]">
                Current Price
              </TableHead>
              <TableHead className="text-right w-[180px]">
                Total value
              </TableHead>
              <TableHead className="text-right w-[180px]">P&L</TableHead>
              <TableHead className="text-right w-[180px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdingsData.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  {/* <TableCell>{data.userId}</TableCell> */}
                  <TableCell>{data.symbol}</TableCell>
                  <TableCell className="text-right">{data.quantity}</TableCell>
                  <TableCell className="text-right">
                    {data.averageBuyPrice}
                  </TableCell>
                  <TableCell className="text-right">
                    {data.currentPrice}
                  </TableCell>
                  <TableCell className="text-right">
                    {Number(+data.currentPrice * +data.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      data.pnl < 0 ? "text-red-700 " : "text-green-700"
                    }`}
                  >
                    {Number(data.pnl).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={"destructive"}
                      onClick={() => onSellStocks(data)}
                    >
                      Sell
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      <SellHoldings
        stock={selectedStock}
        open={isSellStock}
        onOpenChange={setIsSellStock}
      />
    </div>
  );
};
