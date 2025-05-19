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
import { Controller, useForm } from "react-hook-form";

export function AddMoney({ open, onOpenChange }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm();
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
      })[0]?.id;
      console.log("baknkid", bankId);
      const payload = {
        ...data,
        action: "deposit",
        bankId,
      };
      console.log("payload", payload);
      const newTransaction = await postData("/bank/deposit", payload);
      console.log("new transaction", newTransaction);
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
              <Label htmlFor="name">Bank Name</Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full" id="name">
                      <SelectValue placeholder="Select a Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Stocks</SelectLabel>
                        {banks.map((bank, index) => {
                          return (
                            <SelectItem key={index} value={bank.name}>
                              {bank.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
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
                      className="border cursor-pointer border-gray-400 px-2 py-1 rounded-xl me-3"
                    >
                      1,000
                    </span>{" "}
                    <span
                      onClick={() => onSet(5000)}
                      className="border cursor-pointer border-gray-400 px-2 py-1 rounded-xl me-3"
                    >
                      5,000
                    </span>{" "}
                    <span
                      onClick={() => onSet(10000)}
                      className="border cursor-pointer border-gray-400 px-2 py-1 rounded-xl me-3"
                    >
                      10,000
                    </span>{" "}
                    <span
                      onClick={() => onSet(20000)}
                      className="border cursor-pointer border-gray-400 px-2 py-1 rounded-xl"
                    >
                      20,000
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
