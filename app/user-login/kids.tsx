import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../lib/hooks";
import { formActions } from "../lib/features/form/formSlice";
import { reservationDataActions } from "../lib/features/reservationData/reservationDataSlice";

export default function Kids({ index, kidsArray, row }: any) {
  const dispatch = useAppDispatch();

  const [kids, setKids] = useState(kidsArray.map((kid: any) => ({ ...kid })));
  // const [kidValue, setKidValue] = useState(kidsArray[index].value);

  useEffect(() => {
    console.log(index, kidsArray[index]);
  }, [index, kidsArray]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);

    const updatedKids = kidsArray.map((kid: any, i: number) =>
      i === index ? { ...kid, value: newValue } : { ...kid }
    );

    setKids(updatedKids);
    // setKidValue(newValue);

    console.log(updatedKids);

    // Dispatch the updated value
    dispatch(
      reservationDataActions.saveKids({
        kids: updatedKids,
        row: row,
        index: index,
        help: false,
      })
    );
  };

  return (
    <div>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        type="number"
        name={`kid_age_${index + 1}`}
        placeholder={`Age of Kid ${index + 1}`}
        value={kidsArray ? kids[index].value : 0}
        onChange={(e) => handleChange(e, index)}
      />
    </div>
  );
}
