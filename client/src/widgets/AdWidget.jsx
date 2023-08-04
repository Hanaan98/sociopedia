import React, { useState, useEffect } from "react";
import img from "../assets/pmv-chamara-dMjkQJs58uo-unsplash.jpg";
import { Skeleton } from "@mui/material";
function AdWidget() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="w-full h-fit  rounded-xl bg-[#333333] py-4 px-4 flex flex-col gap-2 shadow-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-sm ">Sponsored</h1>
        <p className="text-gray-300 text-xs cursor-pointer hover:text-[#8B5CF6]">
          Create Ad
        </p>
      </div>
      <div>
        {loading ? (
          <Skeleton variant="rectangular" className="rounded-md" height={150} />
        ) : (
          <img
            src={img}
            alt="Ad"
            className="w-full h-36 rounded-md object-cover"
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-white text-sm">Ad Name</h1>
          <p className="text-gray-300 text-xs">Name.com</p>
        </div>
        <p className="text-gray-300 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
}

export default AdWidget;
