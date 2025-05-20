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
import { useStock } from "@/contexts/stock.context";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function BuyStocks({ stock, open, onOpenChange }) {
  const { stocks = [] } = useStock();
  const [totalAmt, setTotalAmt] = useState(0);
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: stock.symbol || "",
    },
  });
  useEffect(() => {
    console.log("stock", stocks);
    setValue("symbol", stock.symbol);
    let currStock = stocks.filter((item) => {
      if (item.id === stock.id) {
        console.log("stock slected", item);
        return item;
      }
    });

    console.log("currstock", currStock);
    setValue("currentPrice", currStock[0]?.currentPrice || 0);
    let qty = getValues("quantity") || 0;
    setTotalAmt(Number(qty * currStock[0]?.currentPrice).toFixed(2));
  }, [stock, stocks]);
  function onBuyStock(data) {
    console.log("onbuy stock", data);
  }
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
              <Label htmlFor="symbol" className="text-right pb-2">
                Stock Symbol
              </Label>
              <Input id="symbol" {...register("symbol")} />
            </div>
            <div className="items-center gap-4 mb-3">
              <Label htmlFor="quantity" className="text-right pb-2">
                Quantity
              </Label>
              <Input id="quantity" {...register("quantity")} />
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
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Buy Stock</Button>
          </DialogFooter>
        </form>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
