// src/pages/HoldingsLayout.jsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../components/shared/Loader";

export default function HoldingsLayout() {
  return (
    <div className="">
      {/* <h1 className="text-xl font-bold mb-4">Holdings</h1> */}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
