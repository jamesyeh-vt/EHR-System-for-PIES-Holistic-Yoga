import { useRouter } from "next/router";
import { useState } from "react";

const ROLE_LABELS = {
    ADMIN: "Admin",
    SENIOR: "Senior Therapist",
    JUNIOR: "Therapist",
};


async function loginRequest(username, password) {
    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    return data;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form
          onSubmit={async (e) => {
              e.preventDefault();
              try {
                  const { token, role } = await loginRequest(username, password);
                  localStorage.setItem("pies-token", token);
                  localStorage.setItem("pies-role", ROLE_LABELS[role]);
                  router.push("/clients/assigned");
              } catch (err) {
                  alert("Login failed");
                  console.error(err);
              }
        }}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
