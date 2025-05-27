import React, { useEffect, useState } from "react";
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
import { getData } from "@/services/http-config";
import { Loader } from "../components/shared/Loader";

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loader, setLoader] = useState(false);
  async function fetchTransactions() {
    setLoader(true);
    const res = await getData("/bank/transactions");
    console.log("res", res);
    setLoader(false);
    setTransactions(res.data.result);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div>
          {loader && <Loader />}
          {!loader && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">Id</TableHead>
                  <TableHead className={"text-right"}>Action</TableHead>
                  <TableHead className={"text-right"}>
                    {" "}
                    Account Number{" "}
                  </TableHead>
                  <TableHead className={"text-right"}> Amount</TableHead>
                  <TableHead className="text-right">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions &&
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className={"text-right"}>
                        {transaction?.id}
                      </TableCell>
                      <TableCell className="font-medium text-right">
                        {String(transaction?.action).toUpperCase()}
                      </TableCell>
                      <TableCell className={"text-right"}>
                        {transaction.accountNo}
                      </TableCell>
                      <TableCell
                        className={`text-right font-bold ${
                          transaction.action == "deposit"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.action == "deposit" ? "+" : "-"}
                        {transaction?.amount}
                      </TableCell>
                      <TableCell className={"text-right"}>
                        {new Date(transaction.createdAt).toLocaleDateString()},
                        {String(
                          new Date(transaction.createdAt).toTimeString()
                        ).substring(0, 8)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};
