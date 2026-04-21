import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AddProduct() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("https://campuscart-kmmd.onrender.com/api/products", {
        title,
        price: Number(price),
        image,
        userId: "123",
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Could not add product. Check backend.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 p-8">
          <h1 className="text-3xl font-black text-slate-900">Add Product</h1>
          <p className="mt-2 text-slate-500">
            Post your item with title, price, and image.
          </p>

          <form onSubmit={handleAdd} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Title
              </label>
              <input
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Engineering Calculator"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="200"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Image URL
              </label>
              <input
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
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
              Publish item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}