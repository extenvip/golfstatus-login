
import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="mb-6 grid grid-cols-2">
            <button
              onClick={() => setMode("login")}
              className={\`py-2 \${mode === "login" ? "bg-blue-500 text-white" : "bg-gray-200"}\`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={\`py-2 \${mode === "signup" ? "bg-blue-500 text-white" : "bg-gray-200"}\`}
            >
              Sign Up
            </button>
          </div>
          {mode === "login" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Ghi log vào file log.txt thông qua API
    await fetch("/api/log-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, time: new Date().toISOString() }),
    });

    alert("Login successful (mock)");
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <input
        className="w-full border p-2 rounded"
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="w-full mt-2 bg-blue-500 text-white p-2 rounded" type="submit">
        Log In
      </button>
    </form>
  );
}

function SignupForm() {
  return (
    <form className="space-y-4">
      <input className="w-full border p-2 rounded" placeholder="Full name" type="text" required />
      <input className="w-full border p-2 rounded" placeholder="Email address" type="email" required />
      <input className="w-full border p-2 rounded" placeholder="Password" type="password" required />
      <button className="w-full mt-2 bg-blue-500 text-white p-2 rounded">Create Account</button>
    </form>
  );
}
