import React, { useEffect } from "react";

export default function Page5() {
  useEffect(() => {
    const page1Button = document.querySelector("#page1-button");
    const page2Button = document.querySelector("#page2-button");
    const page3Button = document.querySelector("#page3-button");
    const page4Button = document.querySelector("#page4-button");
    const page5Button = document.querySelector("#page5-button");

    page1Button?.classList.remove("active");
    page2Button?.classList.remove("active");
    page3Button?.classList.remove("active");
    page4Button?.classList.remove("active");
    page5Button?.classList.add("active");

    // console.log(data.detailedUser);
    // console.log(kidsAges);
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-semibold text-green-600">
          <form></form>
          All your Data has been Saved
        </h1>
      </div>
    </div>
  );
}
