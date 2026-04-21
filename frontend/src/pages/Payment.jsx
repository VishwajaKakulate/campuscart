import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const product = location.state;

  const handlePayment = () => {
    setSuccess(true);
  };

  if (!product) {
    return <h2 className="text-center mt-10">No product selected</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-96 text-center space-y-4">

          {/* SUCCESS UI */}
          {success ? (
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-3">
                🎉 Request Sent!
              </h2>

              <p className="text-gray-600 mb-4">
                Seller will contact you soon.
              </p>

              <button
                onClick={() => navigate("/")}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <>
              {/* PAYMENT UI */}
              <h2 className="text-xl font-bold">Contact Seller 📞</h2>

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-xl"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8";
                }}
              />

              <h3 className="text-lg font-semibold">{product.title}</h3>

              <p className="text-green-600 font-bold text-xl">
                ₹{product.price}
              </p>

              <button
                onClick={handlePayment}
                className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition shadow"
              >
                Proceed to Contact
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}