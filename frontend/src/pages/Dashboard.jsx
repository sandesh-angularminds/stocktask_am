import React, { useEffect, useState } from "react";
import { HoldingsPieChart } from "./holdings/HoldingPieChart";
import { getData } from "@/services/http-config";
import { useAuth } from "@/contexts/auth.context";

export const Dashboard = () => {
  const { setNewTotalBalance } = useAuth();
  let [holdingsData, setHoldingsData] = useState();
  let [loading, setLoading] = useState(false);
  async function getHoldingsDetails() {
    setLoading(true);
    try {
      holdingsData = await getData("/holdings");
      setHoldingsData(holdingsData.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    getHoldingsDetails();
    setNewTotalBalance();
  }, []);
  return (
    <div>
      {loading && <p className="text-center font-bold text-3xl">Loading...</p>}
      {holdingsData?.length ? (
        <HoldingsPieChart holdings={holdingsData} />
      ) : !loading ? (
        <p className="text-center font-bold text-3xl">No Data Available</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};
