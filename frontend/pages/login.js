import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("therapist");
  const router = useRouter();
  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // store role in localStorage (placeholder)
          localStorage.setItem("pies-role", role);
          router.push("/clients/assigned");
        }}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <select
          className="w-full border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="therapist">Therapist</option>
          <option value="senior">Senior Therapist</option>
        </select>
        <button
          type="submit"
          className="w-full bg-brandLavender text-white py-2 rounded hover:opacity-90"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
