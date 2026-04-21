import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://campuscart-kmmd.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block">
          <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-200">
            <h2 className="text-4xl font-black text-slate-900">
              Welcome back to <span className="text-indigo-600">CampusCart</span>
            </h2>
            <p className="mt-4 text-slate-600 max-w-md">
              Login to list items, browse student products, and connect with buyers.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-sm text-slate-500">Fast login</p>
                <p className="font-bold text-slate-900 mt-1">Secure access</p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-sm text-slate-500">Marketplace</p>
                <p className="font-bold text-slate-900 mt-1">Student listings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto w-full">
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 p-8">
            <h1 className="text-3xl font-black text-slate-900">Login</h1>
            <p className="mt-2 text-slate-500">
              Enter your account details to continue.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500 text-center">
              New here?{" "}
              <Link to="/register" className="text-indigo-600 font-semibold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}