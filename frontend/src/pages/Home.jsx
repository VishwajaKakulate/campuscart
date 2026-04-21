import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://campuscart-kmmd.onrender.com/api/products");
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 Improved search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const text = `${p.title} ${p.price}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });
  }, [products, query]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 px-4 py-2 text-sm font-semibold">
              Student marketplace
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900">
              Buy and sell used items
              <span className="text-indigo-600"> within your campus.</span>
            </h2>

            <p className="mt-4 text-slate-600 text-lg">
              List books, calculators, gadgets, notes, and more.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate("/add")}
                className="px-5 py-3 rounded-2xl bg-indigo-600 text-white font-semibold"
              >
                List an item
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-5 py-3 rounded-2xl border"
              >
                Create account
              </button>
            </div>
          </div>

          {/* Right UI */}
          <div className="bg-indigo-600 rounded-2xl p-6 text-white">
            <h2 className="text-xl font-bold">CampusCart</h2>
            <p className="mt-2">Buy & Sell Easily 🚀</p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-xl font-bold">Products</h3>

          <input
            className="w-full sm:w-80 px-4 py-3 rounded-2xl border border-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Products */}
        {loading ? (
          <p className="mt-6">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="mt-6 text-gray-500 text-center">
            No matching products found ❌
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >

                {/* Image */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8";
                  }}
                />

                {/* Title */}
                <h3 className="mt-2 font-bold text-lg">{p.title}</h3>

                {/* Price */}
                <p className="text-green-600 font-bold text-lg">₹{p.price}</p>

                {/* Cart Button (UI only) */}
                <button className="mt-2 w-full bg-indigo-500 text-white py-1 rounded hover:bg-indigo-600">
                  Add to Cart 🛒
                </button>

                {/* Buy Button */}
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");

                    if (!token) {
                      navigate("/login");
                    } else {
                      navigate("/payment", { state: p });
                    }
                  }}
                  className="mt-2 w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                >
                  Buy / Contact
                </button>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Cart Icon */}
      <div className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-indigo-700 transition">
        🛒
      </div>

    </div>
  );
}