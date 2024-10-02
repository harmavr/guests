"use client";

import ReservationDetails from "./ui/reservation-details/page";
import Map from "./ui/map/page";
import Navigation from "./ui/navigation/page";
import villa from "@/public/villa.jpg";
import { useAppSelector } from "./lib/hooks";
import { useEffect, useState } from "react";
import { userData } from "./lib/types";
import { redirect } from "next/navigation";

export default function Page() {
  const reservations = useAppSelector(
    (state) => state.reservation.items
  );

  const loggedIn = useAppSelector(state => state.login.loggedIn)

  const [data, setData] = useState<userData[]>([]);
  useEffect(() => {



    !loggedIn ? redirect('/login-page') : null;

    setData(reservations);
    console.log(reservations);
  }, [reservations]);

  return (
    <div className="relative ">
      <div className="fixed w-full z-10">
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
