import React from "react";
import { Outlet } from "react-router-dom";

export const WatchlistLayout = () => {
  return (
    <div>
      <p className="text-center font-bold text-2xl">Watchlists</p>
      <Outlet />
    </div>
  );
};
