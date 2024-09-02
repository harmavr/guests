import { formActions } from "@/app/lib/features/form/formSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import React, { useEffect, useState } from "react";

export default function Page3() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState([
    {
      checkboxArrival: false,
      FlightArrivalDate: "",
      FlightArrivalTime: "",
      LocationArrival: "",
      FlightArrivalNumber: "",
      NotesArrival: "",

      checkboxDeparture: false,
      FlightDeparturelDate: "",
      FlightDeparturelTime: "",
      LocationDeparturel: "",
      FlightDeparturelNumber: "",
      NotesDeparture: "",
    },
  ]);

  useEffect(() => {
    const buttons = [
      "#page1-button",
      "#page2-button",
      "#page3-button",
      "#page4-button",
    ];
    buttons.forEach((selector, index) => {
      const button = document.querySelector(selector);
      if (index === 2) {
        button?.classList.add("active");
      } else {
        button?.classList.remove("active");
      }
    });
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  const inputClass =
    "appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  return (
    <div className="p-6">
      <form onSubmit={onSubmit}>
        {/* Travel Option 1 */}
        <div className="mb-6">
          <input
            type="checkbox"
            id="travel-chania"
            onChange={(e) => {
              const updatedData = data.map((item, index) => {
                if (index === 0) {
                  // Assuming you're targeting the first object; adjust the condition as needed
                  return { ...item, checkboxArrival: e.target.checked };
                }
                return item;
              });
              setData(updatedData);
              dispatch(
                formActions.saveTravelDetails({
                  ...updatedData,
                  checkboxArrival: e.target.checked,
                })
              );
              console.log(updatedData);
            }}
          />
          <label htmlFor="travel-chania" className="ml-2">
            Travel by boat/Already in Chania
          </label>
        </div>

        {/* Arrival Section */}
        <div className="mb-6">
          <h1 className="text-xl font-bold">Arrival</h1>
          <p className="text-sm text-gray-600 mb-4">
            Please enter the details for your Arrival
          </p>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/4 px-3">
              <input
                type="date"
                className={inputClass}
                onChange={(e) => {
                  const updatedData = data.map((item, index) => {
                    if (index === 0) {
                      // Assuming you're targeting the first object; adjust the condition as needed
                      return { ...item, FlightArrivalDate: e.target.value };
                    }
                    return item;
                  });
                  setData(updatedData);
                  dispatch(
                    formActions.saveTravelDetails({
                      ...updatedData,
                      FlightArrivalDate: e.target.value,
                    })
                  );
                  console.log(updatedData);
                }}
              />
            </div>
            <div className="w-full md:w-1/4 px-3">
              <input
                type="time"
                className={inputClass}
                onChange={(e) => {
                  const updatedData = data.map((item, index) => {
                    if (index === 0) {
                      // Assuming you're targeting the first object; adjust the condition as needed
                      return { ...item, FlightArrivalTime: e.target.value };
                    }
                    return item;
                  });
                  setData(updatedData);
                  dispatch(
                    formActions.saveTravelDetails({
                      ...updatedData,
                      FlightArrivalTime: e.target.value,
                    })
                  );
                  console.log(updatedData);
                }}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <select
                name="locations"
                id="locations"
                className="block w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => {
                  const updatedData = data.map((item, index) => {
                    if (index === 0) {
                      // Assuming you're targeting the first object; adjust the condition as needed
                      return { ...item, LocationArrival: e.target.value };
                    }
                    return item;
                  });
                  setData(updatedData);
                  dispatch(
                    formActions.saveTravelDetails({
                      ...updatedData,
                      LocationArrival: e.target.value,
                    })
                  );
                  console.log(updatedData);
                }}
              >
                <option value="Greece">Greece</option>
                <option value="Turkey">Turkey</option>
                <option value="Albania">Albania</option>
                <option value="Italy">Italy</option>
              </select>
            </div>

            <div className="w-full md:w-1/4 px-3">
              <input
                type="text"
                className={inputClass}
                placeholder="Arrival Flight Number"
                onChange={(e) => {
                  const updatedData = data.map((item, index) => {
                    if (index === 0) {
                      // Assuming you're targeting the first object; adjust the condition as needed
                      return { ...item, FlightArrivalNumber: e.target.value };
                    }
                    return item;
                  });
                  setData(updatedData);
                  dispatch(
                    formActions.saveTravelDetails({
                      ...updatedData,
                      FlightArrivalNumber: e.target.value,
                    })
                  );
                  console.log(updatedData);
                }}
              />
            </div>
            <div className="w-full px-3">
              <textarea
                className={inputClass}
                placeholder="Your notes go here"
                onChange={(e) => {
                  const updatedData = data.map((item, index) => {
                    if (index === 0) {
                      // Assuming you're targeting the first object; adjust the condition as needed
                      return { ...item, NotesArrival: e.target.value };
                    }
                    return item;
                  });
                  setData(updatedData);
                  dispatch(
                    formActions.saveTravelDetails({
                      ...updatedData,
                      NotesArrival: e.target.value,
                    })
                  );
                  console.log(updatedData);
                }}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Travel Option 2 */}
        <div className="mb-6">
          <input
            type="checkbox"
            id="travel-athens"
            onChange={(e) => {
              const updatedData = data.map((item, index) => {
                if (index === 0) {
                  // Assuming you're targeting the first object; adjust the condition as needed
                  return { ...item, checkboxDeparture: e.target.checked };
                }
                return item;
              });
              setData(updatedData);
              dispatch(
                formActions.saveTravelDetails({
                  ...updatedData,
                  checkboxDeparture: e.target.checked,
                })
              );
              console.log(updatedData);
            }}
          />
          <label htmlFor="travel-athens" className="ml-2">
            Travel by boat/Already in Athens
          </label>
        </div>

        {/* Departure Section */}
        <div>
          <h1 className="text-xl font-bold">Departure</h1>
          <p className="text-sm text-gray-600 mb-4">
            Please enter the details for your Departure
          </p>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/4 px-3">
              <input
                type="date"
                className={inputClass}
                onChange={(e) => {
                  const updatedData = data.map((item, index) => {
                    if (index === 0) {
                      // Assuming you're targeting the first object; adjust the condition as needed
                      return { ...item, FlightDeparturelDate: e.target.value };
                    }
                    return item;
                  });
                  setData(updatedData);
                  dispatch(
                    formActions.saveTravelDetails({
                      ...updatedData,
                      FlightDeparturelDate: e.target.value,
                    })
                  );
                  console.log(updatedData);
                }}
              />
            </div>
            <div className="w-full md:w-1/4 px-3">
              <input
                type="time"
                className={inputClass}
                onChange={(e) => {
                  const updatedData = data.map((item, index) => {
                    if (index === 0) {
                      // Assuming you're targeting the first object; adjust the condition as needed
                      return { ...item, FlightDeparturelTime: e.target.value };
                    }
                    return item;
                  });
                  setData(updatedData);
                  dispatch(
                    formActions.saveTravelDetails({
                      ...updatedData,
                      FlightDeparturelTime: e.target.value,
                    })
                  );
                  console.log(updatedData);
                }}
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <select
                name="locations"
                id="locations"
                className="block w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => {
                  const updatedData = data.map((item, index) => {
                    if (index === 0) {
                      // Assuming you're targeting the first object; adjust the condition as needed
                      return { ...item, LocationDeparturel: e.target.value };
                    }
                    return item;
                  });
                  setData(updatedData);
                  dispatch(
                    formActions.saveTravelDetails({
                      ...updatedData,
                      LocationDeparturel: e.target.value,
                    })
                  );
                  console.log(updatedData);
                }}
              >
                <option value="Greece">Greece</option>
                <option value="Turkey">Turkey</option>
                <option value="Albania">Albania</option>
                <option value="Italy">Italy</option>
              </select>
            </div>

            <div className="w-full md:w-1/4 px-3">
              <input
                type="text"
                className={inputClass}
                placeholder="Departure Fligth Number"
                onChange={(e) => {
                  const updatedData = data.map((item, index) => {
                    if (index === 0) {
                      // Assuming you're targeting the first object; adjust the condition as needed
                      return {
                        ...item,
                        FlightDeparturelNumber: e.target.value,
                      };
                    }
                    return item;
                  });
                  setData(updatedData);
                  dispatch(
                    formActions.saveTravelDetails({
                      ...updatedData,
                      FlightDeparturelNumber: e.target.value,
                    })
                  );
                  console.log(updatedData);
                }}
              />
            </div>
            <div className="w-full px-3">
              <textarea
                className={inputClass}
                placeholder="Your notes go here"
                onChange={(e) => {
                  const updatedData = data.map((item, index) => {
                    if (index === 0) {
                      // Assuming you're targeting the first object; adjust the condition as needed
                      return { ...item, NotesDeparture: e.target.value };
                    }
                    return item;
                  });
                  setData(updatedData);
                  dispatch(
                    formActions.saveTravelDetails({
                      ...updatedData,
                      NotesDeparture: e.target.value,
                    })
                  );
                  console.log(updatedData);
                }}
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
