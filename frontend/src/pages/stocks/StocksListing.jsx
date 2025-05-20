import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStock } from "@/contexts/stock.context";
import { postData } from "@/services/http-config";
import { useState } from "react";
import { BuyStocks } from "./BuyStock";

export function StocksListing() {
  const [isAddStock, setIsAddStock] = useState(false);
  const [selectedStock, setSelectedStock] = useState({});
  let { stocks } = useStock();
  function onBuyStock(stock) {
    if (stock) {
      setIsAddStock(true);
      setSelectedStock(stock);
    }
  }
  async function addToWatchlist(stock) {
    console.log("stock", stock);
    try {
      const watchlist = await postData("/watchlist", { symbol: stock.symbol });
      navigate("/watchlist");
    } catch (err) {
      alert("Something wrong");
      console.log("err", err);
    }
  }
  return (
    <div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="">Stock Name</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Current Price</TableHead>
            <TableHead>Actions</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell>{stock.id}</TableCell>
              <TableCell>{stock.currentPrice}</TableCell>
              <TableCell className="">
                <Button
                  variant={"outline"}
                  className={"bg-green-700 me-3 hover:bg-green-500"}
                  onClick={() => onBuyStock(stock)}
                >
                  Buy
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => addToWatchlist(stock)}
                >
                  Add to Watchlist
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
      <BuyStocks
        stock={selectedStock}
        open={isAddStock}
        onOpenChange={setIsAddStock}
      />
    </div>
  );
}
