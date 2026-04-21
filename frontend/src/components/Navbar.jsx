import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-full text-sm font-medium transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white shadow"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/90 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white grid place-items-center font-bold shadow-lg">
            C
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 leading-none">
              CampusCart
            </h1>
            <p className="text-xs text-slate-500">Buy & sell within your campus</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 flex-wrap justify-end">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/add" className={linkClass("/add")}>Add Product</Link>
          <Link to="/register" className={linkClass("/register")}>Register</Link>
          <Link to="/login" className={linkClass("/login")}>Login</Link>

          {token && (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-full text-sm font-medium bg-slate-900 text-white hover:bg-slate-700 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}