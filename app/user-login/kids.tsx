import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { formActions, userData } from "../lib/features/form/formSlice";

export default function Kids({ index }: any) {
  const dispatch = useAppDispatch();
  const arr = useAppSelector((state) => state.form.kidsAges);

  useEffect(() => {
    console.log(arr);
  });

  return (
    <div>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        type="number"
        name={`kid_age_${index + 1}`}
        placeholder={`Age of Kid ${index + 1}`}
        onChange={(e) =>
          dispatch(
            formActions.saveKidsAge({
              index: index,
              age: e.target.value,
              help: false,
            })
          )
        }
      />
    </div>
  );
}
