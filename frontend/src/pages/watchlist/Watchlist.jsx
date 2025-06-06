import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { delData, getData } from "@/services/http-config";
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
import { BuyStocks } from "../stocks/BuyStock";
import { Loader } from "../components/shared/Loader";

export const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState();
  const [selectedStock, setSelectedStock] = useState({});
  const [loader, setLoader] = useState(false);
  const [isBuyStock, setIsBuyStock] = useState();
  async function getAllWatchlists() {
    setLoader(true);
    const data = await getData("/watchlist");
    setLoader(false);
    setWatchlistData(data.data);
  }
  useEffect(() => {
    getAllWatchlists();
  }, []);
  async function buyStock(stock) {
    setSelectedStock(stock);
    setIsBuyStock(true);
  }
  async function deleteWatchlist(id) {
    await delData(`/watchlist/${id}`);
    getAllWatchlists();
    // alert("delete success...");
  }
  return (
    <div>
      {loader && <Loader />}
      {!loader && (
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>User Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className={"text-right"}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlistData &&
              watchlistData.map((watchlist) => (
                <TableRow key={watchlist.id}>
                  <TableCell className="font-medium">{watchlist.id}</TableCell>
                  <TableCell className="font-medium">
                    {watchlist.userId}
                  </TableCell>
                  <TableCell>{watchlist.symbol}</TableCell>
                  <TableCell className={"text-right"}>
                    <Button
                      variant={"outline"}
                      className={"text-green-700 hover:text-green-400 me-3"}
                      onClick={() => buyStock(watchlist)}
                    >
                      Buy
                    </Button>
                    <Button
                      variant={"destructive"}
                      onClick={() => deleteWatchlist(watchlist.id)}
                    >
                      Remove
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
      )}
      <BuyStocks
        stock={{ ...selectedStock, id: selectedStock.stockId }}
        open={isBuyStock}
        onOpenChange={setIsBuyStock}
      />
    </div>
  );
};

{
  /* <div className="text-end">
  {/* <Button onClick={() => navigate("add")} className={"text-end"}>
    Add new
  </Button> 
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
    {!watchlistData?.length && (
      <p className="col-span-4 text-center font-bold text-2xl">
        No Data available
      </p>
    )}
    {watchlistData &&
      watchlistData.map((item, index) => {
        return (
          <ItemCard
            key={index}
            image={item.img || null}
            name={item.symbol}
            onDelete={() => deleteWatchlist(item.id)}
          />
        );
      })}
  </div>
</div> */
}
