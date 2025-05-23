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
import { getData, postData } from "@/services/http-config";
import { useState } from "react";
import { BuyStocks } from "./BuyStock";
import { useNavigate } from "react-router-dom";

export function StocksListing() {
  const [isAddStock, setIsAddStock] = useState(false);
  const [selectedStock, setSelectedStock] = useState({});
  const navigate = useNavigate();
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
      const watchlistData = await getData("/watchlist");
      const found = watchlistData.data.find((item) => item.stockId == stock.id);
      console.log("found==>", found);
      if (found) {
        navigate("/watchlist");
        return;
      }
      await postData("/watchlist", {
        symbol: stock.symbol,
        stockId: stock.id,
      });
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
            <TableHead className={"w-62"}>Current Price</TableHead>
            <TableHead className={"text-right"}>Actions</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell>{stock.id}</TableCell>
              <TableCell className={"w-62"}>{stock.currentPrice}</TableCell>
              <TableCell className={"text-right"}>
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
