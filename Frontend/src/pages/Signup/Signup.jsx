import React, { useState } from "react";
import SignupImg from "../../assets/images/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "", // Role dropdown
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Basic validation (extend as needed)
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.role
    ) {
      return false;
    }
    // Add further validation as necessary
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${apiUrl}/users/register`, formData);
      console.log(response.data);
      navigate("/"); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen px-5 xl:px-0">
      <div className="max-w-[1170px] px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={SignupImg}
                alt="User signing up"
                className="w-full rounded-l-lg h-[700px]"
              />
            </figure>
          </div>
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-green-500">account </span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-2 py-3 border-b border-solid border-[#00ff9561] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                  autoComplete="username"
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-2 py-3 border-b border-solid border-[#00ff9561] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="mb-5">
                <input
                  type="tel"
                  placeholder="Enter Your Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-2 py-3 border-b border-solid border-[#00ff9561] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                  autoComplete="tel"
                />
              </div>
              <div className="mb-5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-2 py-3 border-b border-solid border-[#00ff9561] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                  autoComplete="new-password"
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  <label
                    htmlFor="showPassword"
                    className="text-headingColor text-[15px] leading-7"
                  >
                    Show Password
                  </label>
                </div>
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Role:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
              </div>

              {error && (
                <div className="mb-5 text-red-600 text-[16px]">{error}</div>
              )}
              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white text-[16px] leading-7 rounded-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <HashLoader size={20} color="#ffffff" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <p className="text-[15px] leading-7 text-headingColor">
                Already have an account?{" "}
                <Link to="/" className="text-green-400">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
