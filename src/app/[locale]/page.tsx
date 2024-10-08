"use client";

import ReservationDetails from "./ui/reservation-details/page";
import Map from "./ui/map/page";
import Navigation from "./ui/navigation/page";
import villa from "@/src/app/public/villa.jpg";
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { useEffect, useState } from "react";
import { userData } from "./lib/types";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { loginAction } from "./lib/features/login/loginSlice";
import { useTranslations } from "next-intl";

export default function Page() {
  const reservations = useAppSelector(
    (state) => state.reservation.items
  );

  // const loggedIn = useAppSelector(state => state.login.loggedIn)

  // const [state, setState] = useState(loggedIn)

  const dispatch = useAppDispatch()

  const [data, setData] = useState<userData[]>([]);
  const router = useRouter();



  // useEffect(() => {


  //   setState(loggedIn)

  //   // Only redirect if the loggedIn state has changed
  //   if (loggedIn) {
  //     console.log("User is logged in, redirecting...");
  //     dispatch(loginAction.login({ user: { firstName: '', lastName: '' } }))
  //     router.push('/'); // Use router.push to redirect to the home page
  //   } else if (!loggedIn) {
  //     console.log("User not logged in, redirecting to login page...");
  //     router.push('/login-page'); // Redirect to login page
  //   }
  // }, [loggedIn, router]);

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
