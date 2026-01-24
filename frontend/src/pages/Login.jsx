import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN with username + password
        const res = await loginUser({
          username: formData.username,
          password: formData.password,
        });

        // Save token & user
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        setMessage(`Welcome back, ${res.user.username || formData.username}!`);
        navigate("/dashboard"); // navigate only after login
      } else {
        // REGISTER
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          setLoading(false);
          return;
        }

        const res = await registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        // Show success message but do NOT navigate
        setMessage(res.message || "Registered successfully!");
        setIsLogin(true); // switch to login mode automatically
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h1>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            className={`px-5 py-2 rounded-l-lg font-semibold transition ${
              isLogin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={`px-5 py-2 rounded-r-lg font-semibold transition ${
              !isLogin ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Feedback messages */}
        {message && <p className="text-center text-green-600 font-medium mb-3">{message}</p>}
        {error && <p className="text-center text-red-500 font-medium mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email only for registration */}
          {!isLogin && (
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password only for registration */}
          {!isLogin && (
            <div className="relative">
              <label className="block mb-1 font-semibold text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 font-bold rounded-lg transition ${
              isLogin
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
