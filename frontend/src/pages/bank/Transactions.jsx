import React, { useEffect } from "react";
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

export const Transactions = () => {
  async function fetchTransactions() {
    const res = await getData("/bank/transactions");
    console.log("res", res);
  }
  useEffect(() => {
    
  });
  return <div></div>;
};
