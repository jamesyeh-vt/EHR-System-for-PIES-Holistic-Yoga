import React from "react";

export const CheckBoxGroup = ({ title, namePrefix, options, register }) => {
  return (
    <div className="mb-6">
      <h4 className="text-md font-medium mb-2 text-brandLavender">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {options.map((opt) => {
          const fieldName = `${namePrefix}.${opt}`;
          return (
            <label
              key={opt}
              className="inline-flex items-center space-x-2 bg-white border border-gray-300 rounded p-2 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                {...register(fieldName)}
                className="form-checkbox text-brandLavender h-4 w-4"
              />
              <span className="text-sm">{opt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
