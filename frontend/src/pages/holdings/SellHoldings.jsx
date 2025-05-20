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
import { postData, putData } from "@/services/http-config";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function SellHoldings({ stock, open, onOpenChange }) {
  const { stocks = [] } = useStock();
  const { user, setNewTotalBalance } = useAuth();
  const maxQuantity = stock?.quantity;
  const [totalAmt, setTotalAmt] = useState(0);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
  } = useForm({
    defaultValues: {},
  });
  useEffect(() => {
    let currStock = stocks.filter((item) => {
      if (item.id === Number(stock.stockId)) {
        return item;
      }
    });

    setValue("symbol", stock.symbol);
    setValue("currentPrice", currStock[0]?.currentPrice || 0);
    let qty = getValues("quantity") || 0;
    setTotalAmt(Number(qty * currStock[0]?.currentPrice).toFixed(2));
  }, [stock, stocks]);
  useEffect(() => {}, [totalAmt]);

  async function onSellQuantity(data) {
    try {
      let averageBuyPrice = data.currentPrice;
      const holdingsData = await putData(`/holdings/${stock.stockId}`, {
        ...data,
        quantity: data.quantity,
        currentPrice: data.currentPrice,
      });

      await postData("/bank/deposit", {
        amount: totalAmt,
        action: "deposit",
      });
      onOpenChange(false);
      navigate("/holdings");
      setNewTotalBalance();
    } catch (err) {
      alert("Something wrong");
      console.log("err", err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline hidden"></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sell Stock</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>

        <form onSubmit={handleSubmit(onSellQuantity)}>
          <div className="">
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
              {maxQuantity < getValues("quantity") && (
                <p className="text-red-600">
                  {" "}
                  You have less qty than you enterned
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={maxQuantity < getValues("quantity")}
              type="submit"
            >
              Sell stock ({getValues("quantity")}/{maxQuantity})
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
