import React from "react";

export const sanitizeKey = (str) => str.replace(/[^a-zA-Z0-9]/g, "_");

export const CheckBoxGroup = ({ title, namePrefix, options, register }) => {
  return (
    <div className="mb-6">
      <h4 className="text-md font-medium mb-2 text-brandLavender">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {options.map((option) => {
          const label = typeof option === "string" ? option : option.label;
          const key = typeof option === "string" ? sanitizeKey(option) : option.key;

          return (
            <label key={key} className="flex items-center space-x-2">
              <input type="checkbox" {...register(`${namePrefix}.${key}`)} />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};