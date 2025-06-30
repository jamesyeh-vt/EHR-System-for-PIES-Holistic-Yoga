export function TextInput({ label, name, register, required = false, ...rest }) {
  return (
    <label className="block mb-4">
      <span className="block font-medium mb-1">{label}</span>
      <input
        {...register(name, { required })}
        {...rest}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brandLavender"
      />
    </label>
  );
}