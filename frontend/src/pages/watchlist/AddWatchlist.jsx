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
import { postData } from "@/services/http-config";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function AddWatchlist() {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
      const holdingsData = await postData("/watchlist", data);
      navigate("/watchlist");
    } catch (err) {
      alert("Something wrong");
      console.log("err", err);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Add Watchlist</CardTitle>
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

            <Button type="submit" className="w-full">
              Add to Watchlist
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
