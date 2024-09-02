"use client";

import ReservationDetails from "./ui/reservation-details/page";
import Map from "./ui/map/page";
import Navigation from "./ui/navigation/page";
import Card from "./ui/card";
import villa from "@/public/villa.jpg";
import villa2 from "@/public/villa2jpg.jpg";
import villa3 from "@/public/villa3jpg.jpg";
import { Provider, useSelector } from "react-redux";
import { useAppSelector } from "./lib/hooks";
import { RootState } from "./lib/store";
import { useEffect, useState } from "react";
import { userData } from "./lib/types";

export default function Page() {
  const reservations = useSelector(
    (state: RootState) => state.reservation.items
  );
  const [data, setData] = useState<userData[]>([]);

  useEffect(() => {
    setData(reservations);
    console.log(reservations);
  }, [reservations]);

  return (
    <div className="relative ">
      <div className="fixed w-full ">
        <Navigation />
      </div>
      <main className="flex pt-16">
        <div className="w-1/3 p-8 ">
          <ul>
            {data.map((el, index) => (
              <li className="space-y-4" key={index}>
                <ReservationDetails
                  details={el}
                  title={el.propertyName}
                  image={villa}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 p-8 ">
          <div className="top-16 sticky  overflow-hidden shadow-lg">
            <Map />
          </div>
        </div>
      </main>
    </div>
  );
}
