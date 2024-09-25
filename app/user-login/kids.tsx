import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { formActions } from "../lib/features/form/formSlice";

export default function Kids({ index, numOfKids }: any) {
  const dispatch = useAppDispatch();

  const [kids, setKids] = useState(numOfKids)

  useEffect(() => {
    console.log(index, numOfKids[index]);

  });

  const handleChange = (e) => {


    console.log(e.target.value);

    setKids(e.target.value)
    console.log(kids);

    dispatch(
      formActions.saveKidsAge({
        index: index,
        age: e.target.value,
        help: false,
      })
    )
  }

  return (
    <div>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        type="number"
        name={`kid_age_${index + 1}`}
        placeholder={`Age of Kid ${index + 1}`}
        value={kids ? kids[index].value : 0}
        onChange={(e) =>
          handleChange(e)

        }
      />
    </div>
  );
}
