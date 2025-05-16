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
import { Link, useNavigate } from "react-router-dom";
import { getData, delData } from "@/services/http-config";

export const Holdings = () => {
  const navigate = useNavigate();
  let [holdingsData, setHoldingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function deleteHolding(id) {
    try {
      let res = await delData("/holdings/" + id);
      getHoldingsDetails();
      console.log("del hol", res);
    } catch (error) {
      alert("delete holding error");
    }
  }

  async function getHoldingsDetails() {
    try {
      holdingsData = await getData("/holdings");
      console.log("holding data", holdingsData);
      setHoldingsData(holdingsData.data);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    getHoldingsDetails();
  }, []);
  function onAddHolding() {
    navigate("/holdings/add");
  }
  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => onAddHolding()}>Add Holding</Button>
      </div>
      <Table>
        <TableCaption>A list of your holdings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            {/* <TableHead>User id</TableHead> */}
            <TableHead>Symbol</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Average Price</TableHead>
            <TableHead className="text-right">Current Price</TableHead>
            <TableHead className="text-right">Total value</TableHead>
            <TableHead className="text-right">P&L</TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
                <TableCell className="text-right">{data.totalValue}</TableCell>
                <TableCell
                  className={`text-right ${
                    data.pnl < 0
                      ? "text-red-700 "
                      : "text-green-700 "
                  }`}
                >
                  {data.pnl}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    to={`/holdings/edit/${data.id}`}
                    className="border-2 border-black px-4 py-2 rounded-lg"
                  >
                    Edit{" "}
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant={"destructive"}
                    onClick={() => deleteHolding(data.id)}
                  >
                    Sell
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
