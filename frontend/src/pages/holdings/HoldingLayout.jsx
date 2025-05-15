// src/pages/HoldingsLayout.jsx
import { Outlet } from "react-router-dom";

export default function HoldingsLayout() {
  return (
    <div className="">
      {/* <h1 className="text-xl font-bold mb-4">Holdings</h1> */}
      <Outlet />
    </div>
  );
}
