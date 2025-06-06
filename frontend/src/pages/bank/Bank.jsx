import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth.context";
import { postData } from "@/services/http-config";

import { Label } from "@radix-ui/react-label";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Bank = ({ open, onOpenChange }) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { setNewTotalBalance } = useAuth();
  const navigate = useNavigate();
  async function onAddBank(data) {
    console.log(data);
    await postData("/bank/create", data);
    setNewTotalBalance();
    onOpenChange(false);
    navigate("/dashboard");
  }
  function onSet(amt) {
    amt += getValues("amount") || 0;
    setValue("amount", amt);
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button className={"hidden"} variant="outline"></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Bank Account</DialogTitle>
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
              <div>
                <Label htmlFor="accountNo">Account Number</Label>
                <Input type={"text"} {...register("accountNo")} />
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
              <Button type="submit">Add bank</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
