import React, { useRef, useState } from "react";
import data from "../lib/data.json";

interface ModalDetails {
  open: boolean;
  modalHandler(): any;
  userHandler(firstName: string, lastName: string): any;
}

interface UserDetails {
  firstName: string;

  [key: string]: any;
}

export default function Modal({
  open,
  modalHandler,
  userHandler,
}: ModalDetails) {
  const refForm = useRef(null);
  const [user, setUser] = useState({ firstName: "", lastName: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    userHandler(user.firstName, user.lastName);
    console.log(user.firstName, user.lastName);

    closeModal(false, modalHandler);
    // setUser({ ...user, firstName: user.firstName, lastName: user.lastName });

    console.log(user);
  };

  const closeModal = (
    open: boolean,
    modalHandler: { (): any; (arg0: boolean): void }
  ) => {
    modalHandler(!open);
  };

  return (
    <>
      <aside
        id="separator-sidebar"
        className="fixed z-10 top-0 left-0  h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <button
            onClick={() => closeModal(open, modalHandler)}
            className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 border rounded relative"
          >
            x
          </button>

          <div>
            <p>
              {data.map((e) => (
                <p key={e.email}>{e.firstName}</p>
              ))}
            </p>
          </div>

          {user && (
            <div>
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
            </div>
          )}
          <form onSubmit={onSubmit} ref={refForm} className="w-full max-w-lg">
            {/* <form onSubmit={submitHandler} className="w-full max-w-lg"> */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <select className="md:w-full" name="dropdown" id="dropdown">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <input
                  className="appearance-none block md:w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                  // required
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <input
                  className="appearance-none block md:w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                  // required
                />
              </div>
            </div>
            <div className="email">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="email"
                name="email"
                id=""
                placeholder="Email"
                // required
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <select className="md:w-full" name="dropdown" id="dropdown">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  className="appearance-none block md:w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  placeholder="Phone"
                  // required
                />
              </div>
            </div>
            <div className="travellers-details">
              <h3>Please enter the details</h3>
              {/* <i>enter the required fileds</i> */}
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <select className="md:w-full" name="dropdown" id="dropdown">
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Passport"
                    // required
                  />
                </div>
              </div>
            </div>
            <div className="travellers-address">
              <h3>Address</h3>
              <i>enter the address details</i>
              <div className="row">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Home address"
                  // required
                />
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="City"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="Postal code"
                      // required
                    />
                  </div>
                </div>

                <select className="md:w-full" name="dropdown" id="dropdown">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
            <div className="checkbox">
              <label className="container">
                GCDPR
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="checkbox"
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <i>The info bla bla</i>{" "}
            <div className="button">
              <button
                className="flex text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                type="submit"
              >
                Submit
              </button>
              <button
                onClick={() => closeModal(open, modalHandler)}
                className="flex text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              >
                Close Modal
              </button>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}
