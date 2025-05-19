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
import { postData } from "@/services/http-config";

import { Label } from "@radix-ui/react-label";
import React from "react";
import { useForm } from "react-hook-form";

export const Bank = ({ open, onOpenChange }) => {
  const { register, data, handleSubmit, setValue, getValues } = useForm();
  async function onAddBank(data) {
    console.log(data);
    const createdBank = await postData("/bank/create", data);
  }
  function onSet(amt) {
    amt += getValues("amount") || 0;
    setValue("amount", amt);
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline"></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Bank Account</DialogTitle>
            {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
          </DialogHeader>
          <form onSubmit={handleSubmit(onAddBank)}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="bankName">Bank name </Label>
                <Input type={"text"} {...register("name")} />
              </div>
              <div>
                <Label htmlFor="bankName">IFSC code</Label>
                <Input type={"text"} {...register("ifsc")} />
              </div>
              <div className="grid items-center gap-4">
                <div className="flex-col">
                  <Label htmlFor="amount" className="text-right col-span-4">
                    Initial Deposit Amount
                  </Label>
                  <br />
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
    </div>
  );
};
