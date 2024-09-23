import React from "react";
import map from "@/public/map.jpg";
import Image from "next/image";

export default function Map() {
  return (
    <div className=" rounded overflow-hidden shadow-lg ">
      <Image className="object-cover w-full h-full" src={map} alt="Map" />
      <h2>asdasdas</h2>
    </div>
  );
}
