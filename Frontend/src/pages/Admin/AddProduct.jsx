import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HashLoader } from "react-spinners";
import profile from "../../assets/images/profile.jpg";
import AdminHeader from "../../components/AdminHeader";
import proImg from "../../assets/images/products.jpg";
import { jwtDecode } from "jwt-decode";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    inStock: true,
  });
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");
  const [adminName, setAdminName] = useState(""); // State for admin name

  // useEffect(() => {
  //   const fetchAdminData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const decodedToken = jwtDecode(token);
  //       const adminId = decodedToken.id;
  //       console.log("Admin ID:", adminId); // Debugging

  //       const response = await axios.get(
  //         `http://localhost:8000/api/users/${adminId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       setAdminName(response.data.username);
  //     } catch (error) {
  //       console.error(
  //         "Failed to fetch admin data:",
  //         error.response ? error.response.data : error.message
  //       );
  //     }
  //   };

  //   fetchAdminData();
  // }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("folder", "ecommerce"); // Specify the folder here

    setImageLoading(true);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        image: response.data.secure_url, // Make sure to set the correct field name
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    try {
      const token = localStorage.getItem("token"); // Retrieve the token here

      const response = await axios.post(
        `https://ecommerce-website-jhgs.onrender.com/api/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      console.log("Product created:", response.data);
      alert("Product created");
      window.location.reload();
    } catch (error) {
      console.error("Failed to create product:", error);
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center  items-center min-h-screen w-full lg:py-0 px-5 xl:px-0">
      <div className="w-full px-6 mx-auto">
        <AdminHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:items-center lg:justify-center">
          <div className="lg:pl-[200px] py-10 lg:py-0 flex flex-col justify-center ">
            <div className=" py-10 lg:py-0 flex flex-col items-start">
              {" "}
              {/* Changed justify-center to items-start */}
              <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-left">
                {" "}
                {/* Added text-left class */}
                <p className="text-blue-600 font-black">
                  Welcome, {adminName || "Admin"}!
                </p>
                Add <span className="text-green-500">New Product</span>
              </h3>
            </div>

            <form onSubmit={submitHandler} className="w-full max-w-md">
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-2 py-3 border-b border-solid border-[#00ff9561] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="mb-5">
                <textarea
                  placeholder="Enter Product Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-2 py-3 border-b border-solid border-[#00ff9561] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                  autoComplete="description"
                />
              </div>
              <div className="mb-5">
                <input
                  type="number"
                  placeholder="Enter Product Price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-2 py-3 border-b border-solid border-[#00ff9561] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                  autoComplete="price"
                />
              </div>
              <div className="mb-5 flex items-center gap-3">
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img
                    src={formData.image || profile}
                    alt="Avatar"
                    className="w-full rounded-full"
                  />
                </figure>

                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    accept=".jpg, .png"
                    onChange={handleImageUpload}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-green-100 text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    {imageLoading ? (
                      <HashLoader
                        size={20}
                        color="white"
                        style={{ marginLeft: "20px" }}
                      />
                    ) : (
                      "Upload Photo"
                    )}
                  </label>
                </div>
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  In Stock:
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={(e) =>
                      setFormData({ ...formData, inStock: e.target.checked })
                    }
                    className="ml-2"
                  />
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
                    "Add Product"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Image preview section, hidden on mobile screens */}
          <div className="hidden lg:flex lg:flex-col text-center justify-center items-center">
            <div className="relative w-[500px] h-[600px] flex justify-center items-center">
              <div className="circular-text permanent-marker-regular">
                Add Items
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
