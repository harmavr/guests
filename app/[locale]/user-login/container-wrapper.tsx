"use client";

import { Footer } from "./footer";
import Nav from "./nav";
import Pages from "./pages";

export default function ContainerWraper() {
  return (
    <div className="flex-grow p-6 md:p-12 ">
      <Nav />
      <hr className="border-t-2 border-gray-500 my-4" />
      <Pages />
      <Footer />
    </div>
  );
}
