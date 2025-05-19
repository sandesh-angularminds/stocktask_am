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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getData, postData } from "@/services/http-config";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function AddMoney({ open, onOpenChange }) {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [banks, setBanks] = useState();
  async function fetchBanks() {
    //fetch all banks;
    const bankData = await getData("/bank");
    setBanks(bankData.data.result);
  }
  useEffect(() => {
    fetchBanks();
  }, [open]);

  async function onAddMoney(data) {
    try {
      console.log("onAdd money", banks, data);
      const bankId = banks.filter((item) => {
        console.log("item", item);
        return item.name == data.name;
      })[0];
      console.log("baknkid", bankId);
      const payload = {
        ...data,
        action: "deposit",
        bankId,
      };
      console.log("payload", payload);
      //   const newTransaction = await postData("/bank/deposit", payload);
      //   console.log("new transaction", newTransaction);
      onOpenChange(false);
    } catch (error) {
      console.log("error", error);
    }
    // onOpenChange(false);
  }
  function onSet(amount) {
    let newAmt = (getValues("amount") || 0) + amount;
    setValue("amount", newAmt);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline"></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Money</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <form onSubmit={handleSubmit(onAddMoney)}>
          <div className="grid gap-4 py-4">
            {/* select banks  */}
            <div>
              <Label htmlFor="name">Bank name </Label>
              <Select {...register("name")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Banks</SelectLabel>
                    {banks &&
                      banks.map((bank) => {
                        return (
                          <SelectItem key={bank.name} value={bank.name}>
                            {bank.name}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div>
                <p className="flex justify-between">
                  {" "}
                  <span
                    onClick={() => onSet(1000)}
                    className="border cursor-pointer border-gray-400 px-4 py-2 rounded-xl mx-3"
                  >
                    1,000
                  </span>{" "}
                  <span
                    onClick={() => onSet(5000)}
                    className="border cursor-pointer border-gray-400 px-4 py-2 rounded-xl mx-3"
                  >
                    5,000
                  </span>{" "}
                  <span
                    onClick={() => onSet(10000)}
                    className="border cursor-pointer border-gray-400 px-4 py-2 rounded-xl mx-3"
                  >
                    10,000
                  </span>{" "}
                </p>
              </div>
              <Input
                id="amount"
                type={"number"}
                {...register("amount")}
                className="col-span-4"
              />
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username"  value="@peduarte" className="col-span-3" />
          </div> */}
          </div>
          <DialogFooter>
            <Button type="submit">Add money</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
