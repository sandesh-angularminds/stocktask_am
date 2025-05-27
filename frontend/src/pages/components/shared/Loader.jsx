import React from "react";
import { LineWave } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-100 bg-opacity-70 backdrop-blur-sm">
      <LineWave
        height="100"
        width="100"
        color="#fa0707"
        middleLineColor="#14fa07"
        ariaLabel="line-wave-loading"
        visible={true}
        lastLineColor="#fa0707"
      />
      <h3 className="mt-4 text-lg font-medium text-gray-500 ">Loading...</h3>
    </div>
  );
};
