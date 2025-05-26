import { getData } from "@/services/http-config";
import React, { useEffect } from "react";

export const BankListing = () => {
  useEffect(() => {
    async function fetchBanks() {
      let banksData = await getData("/banks");
      
    }
  }, []);
  return <div>BankListing</div>;
};
