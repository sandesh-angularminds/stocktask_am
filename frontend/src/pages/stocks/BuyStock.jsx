import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth.context";
import { useStock } from "@/contexts/stock.context";
import { postData } from "@/services/http-config";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function BuyStocks({ stock, open, onOpenChange }) {
  console.log("stock details==>", stock);
  const { stocks = [] } = useStock();
  const { user, setNewTotalBalance } = useAuth();
  const [totalAmt, setTotalAmt] = useState(0);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: {},
  });
  useEffect(() => {
    let currStock = stocks.filter((item) => {
      if (item.id == stock.id) {
        return item;
      }
    });
    console.log("currstock", currStock);
    setValue("symbol", stock.symbol);
    setValue("stockId", stock.id);
    setValue("currentPrice", currStock[0]?.currentPrice || 0);
    let qty = getValues("quantity") || 0;
    setTotalAmt(Number(qty * currStock[0]?.currentPrice).toFixed(2));
  }, [stock, stocks]);
  async function onBuyStock(data) {
    try {
      let averageBuyPrice = data.currentPrice;
      await postData("/holdings", {
        ...data,
        averageBuyPrice,
      });

      await postData("/bank/withdraw", {
        amount: totalAmt,
        action: "withdraw",
      });
      setNewTotalBalance();
      navigate("/holdings");
    } catch (err) {
      alert("Something wrong");
      console.log("err", err);
    }
  }
  useEffect(() => {
    console.log("buy stock", user);
  }, [totalAmt]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline hidden"></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy Stock</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>

        <form onSubmit={handleSubmit(onBuyStock)}>
          <div className="">
            <div className="items-center gap-4 mb-3">
              <Label htmlFor="stockid" className="text-right pb-2">
                Stock Id
              </Label>
              <Input disabled={true} id="stockid" {...register("stockId")} />
            </div>
            <div className="items-center gap-4 mb-3">
              <Label htmlFor="symbol" className="text-right pb-2">
                Stock Symbol
              </Label>
              <Input disabled={true} id="symbol" {...register("symbol")} />
            </div>
            <div className="items-center gap-4 mb-3">
              <Label htmlFor="quantity" className="text-right pb-2">
                Quantity
              </Label>
              {/* <Input id="quantity" {...register("quantity")} /> */}
              <Controller
                name="quantity"
                control={control}
                className="w-full"
                defaultValue="0"
                render={({ field }) => (
                  <input
                    type={"number"}
                    {...field}
                    className="w-full py-1 px-3"
                    onChange={(e) => {
                      field.onChange(e); // important to call this to update form state
                      let prevQty = getValues("quantity");
                      setValue("quantity", e.target.value);
                      setTotalAmt(
                        Number(prevQty * getValues("currentPrice")).toFixed(2)
                      );
                    }}
                  />
                )}
              />
            </div>
            <div className="items-center gap-4 mb-3">
              <Label htmlFor="currentPrice" className="text-right pb-2">
                Current Price
              </Label>
              <Input
                id="currentPrice"
                disabled={true}
                {...register("currentPrice")}
              />
            </div>

            <div className="text-end mb-3 ">
              <p className="text-green-600">
                {" "}
                Total amount:- <span>{totalAmt} </span>
              </p>
              {totalAmt > user?.totalBalance && (
                <p className="text-red-600 h-5">
                  {" "}
                  Total amount is less than needed
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button disabled={totalAmt > user?.totalBalance} type="submit">
              Buy Stock
            </Button>
          </DialogFooter>
        </form>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
