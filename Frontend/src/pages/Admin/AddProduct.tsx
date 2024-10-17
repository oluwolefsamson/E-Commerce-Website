import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HashLoader } from "react-spinners";
import proImg from "../../assets/images/products.jpg";

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImage = new FormData();
    formDataImage.append("file", file);

    setImageLoading(true);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${""}/image/upload`,
        formDataImage
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: response.data.secure_url,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post(
        `https://your-backend-api-url.com/api/v1/products`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Product added successfully.");
        navigate("/products");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen px-5 xl:px-0">
      <div className="max-w-[1250px] px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:items-center lg:justify-center">
          {/* Form section */}
          <div className="lg:pl-16 py-10 lg:py-0">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              <p className="text-blue-600 font-black"> Welcome Admin</p> Add a{" "}
              <span className="text-green-500">New Product</span>
            </h3>

            <form onSubmit={submitHandler}>
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
              <div className="mb-5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-2 py-3"
                  required
                />
                {imageLoading && <p>Uploading Image...</p>}
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
          <div className="hidden lg:flex justify-center items-center">
            <img
              src={proImg}
              alt=""
              className="w-full h-[500px]"
              style={{
                borderRadius: "100px 0",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
