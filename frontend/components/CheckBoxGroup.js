export function CheckBoxGroup({ title, namePrefix, options, register }) {
  return (
    <fieldset className="mb-6 border border-gray-200 p-4 rounded-md">
      <legend className="font-semibold mb-2 px-2 text-brandLavender">{title}</legend>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((opt) => (
          <label key={opt} className="inline-flex items-center space-x-2">
            <input type="checkbox" value={opt} {...register(`${namePrefix}.${opt}`)} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
