import { getData, postData } from "@/services/http-config";
import React, { useEffect, useState } from "react";
import { TableCell } from "@/components/ui/table";
import { SharedTable } from "../components/shared/SharedTable";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";

export const BankListing = () => {
  const [banks, setBanks] = useState();
  let { setNewTotalBalance } = useAuth();
  async function fetchBanks() {
    let banksData = await getData("/bank");
    console.log("bankdata", banksData.data.result);
    let bankList = banksData.data.result || [];
    setBanks(bankList);
  }
  useEffect(() => {
    fetchBanks();
  }, []);
  async function setDefault(bank) {
    try {
      let data = await postData(`/bank/default/${bank.accountNo}`);
      setNewTotalBalance();
      fetchBanks();
      console.log("set default bank", data);
    } catch (error) {
      console.error("error", error);
    }
  }
  return (
    <div>
      <h3 className="text-3xl font-bold text-center">Bank Listing</h3>
      <SharedTable
        columns={[
          "Sr.no",
          "Account no",
          "Bank Name",
          "IFSC code",
          "Amount",
          "Actions",
        ]}
        data={banks}
        renderRow={(item, index) => {
          return (
            <>
              <TableCell>{index}</TableCell>
              <TableCell>{item?.accountNo}</TableCell>
              <TableCell>
                {item?.name} {item.isDefault ? <span>(default)</span> : ""}{" "}
              </TableCell>
              <TableCell>{item?.ifsc}</TableCell>
              <TableCell>{item?.totalBalance}</TableCell>
              <TableCell className={"text-right"}>
                {item.isDefault ? (
                  <Button disabled>Default</Button>
                ) : (
                  <Button onClick={() => setDefault(item)}>Set default</Button>
                )}
              </TableCell>
            </>
          );
        }}
      />
    </div>
  );
};
