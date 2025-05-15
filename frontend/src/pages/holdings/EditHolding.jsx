import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getData, postData, putData } from "@/services/http-config";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { symbol } from "zod";

export function EditHolding() {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      symbol: "",
      quantity: "",
      averageBuyPrice: "",
      currentPrice: "",
    },
  });
  const { id } = useParams();
  async function fetchHoldingDetails() {
    try {
      const res = await getData("/holdings/" + id);
      reset(res.data);
    } catch (error) {
      console.error("Failed to fetch holding", error);
    }
  }

  useEffect(() => {
    console.log("id", id);
    if (id) {
      fetchHoldingDetails(id);
    } else {
      alert("id is not present");
    }
  }, [id, reset]);

  const stocksData = [
    {
      name: "AAPL",
    },
    {
      name: "INFY",
    },
    {
      name: "TSLA",
    },
  ];
  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const holdingsData = await putData("/holdings/" + id, data);
      navigate("/holdings");
    } catch (err) {
      alert("Something wrong");
      console.log("err", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Edit Holding</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="symbol">Symbol</Label>
              <Controller
                name="symbol"
                control={control}
                rules={{ required: "Symbol is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full" id="symbol">
                      <SelectValue placeholder="Select a stock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Stocks</SelectLabel>
                        {stocksData.map((stock, index) => {
                          return (
                            <SelectItem key={index} value={stock.name}>
                              {stock.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.symbol && (
                <p className="text-red-500 text-sm">{errors.symbol.message}</p>
              )}
            </div>
            {/* 
            <div>
              <Label htmlFor="email">Symbol</Label>
              <Input
                id="symbol"
                type="string"
                {...register("symbol", { required: "symbol is required" })}
              />
            </div> */}
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity", { required: "Quantity is required" })}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="averageBuyPrice">averageBuyPrice</Label>
              <Input
                id="averageBuyPrice"
                type="number"
                {...register("averageBuyPrice", {
                  required: "averageBuyPrice is required",
                })}
              />
              {errors.averageBuyPrice && (
                <p className="text-red-500 text-sm">
                  {errors.averageBuyPrice.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="currentPrice">currentPrice</Label>
              <Input
                id="currentPrice"
                type="number"
                {...register("currentPrice", {
                  required: "currentPrice is required",
                })}
              />
              {errors.currentPrice && (
                <p className="text-red-500 text-sm">
                  {errors.currentPrice.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Edit holdings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
