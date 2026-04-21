import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("https://campuscart-kmmd.onrender.com/api/auth/register", {
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Could not register. Try a different email.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-[2rem] p-10 text-white shadow-2xl">
            <h2 className="text-4xl font-black">
              Join <span className="text-white/90">CampusCart</span>
            </h2>
            <p className="mt-4 text-white/90 max-w-md">
              Create your account and start buying and selling campus items in a clean, simple marketplace.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/15 backdrop-blur p-4">
                <p className="text-sm opacity-90">Student-first</p>
                <p className="font-bold mt-1">Campus marketplace</p>
              </div>
              <div className="rounded-2xl bg-white/15 backdrop-blur p-4">
                <p className="text-sm opacity-90">Easy listing</p>
                <p className="font-bold mt-1">Post in minutes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto w-full">
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 p-8">
            <h1 className="text-3xl font-black text-slate-900">Register</h1>
            <p className="mt-2 text-slate-500">
              Create a new account to start using CampusCart.
            </p>

            <form onSubmit={handleRegister} className="mt-8 space-y-4">
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
                className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}