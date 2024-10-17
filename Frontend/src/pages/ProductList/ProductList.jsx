import { useState } from "react";
import { useCart } from "../../components/CartContext";
import NewProductModal from "../../components/NewProductModal.jsx";
import LogoutModal from "../../components/LogoutModal.jsx"; // Import LogoutModal
import cartImg from "../../assets/images/cart.png";
import { Link } from "react-router-dom"; // Import Link for routing

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    description: "This is a beautiful earthen bottle for all your needs.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    description: "Stay hydrated with this stylish tumbler.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
    description: "Never run out of pages for your notes.",
  },
  {
    id: 4,
    name: "Men's  Tee in black.",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    description: "Front of men's Basic Tee in black.",
  },
  {
    id: 5,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    description: "This is a beautiful earthen bottle for all your needs.",
  },
  {
    id: 6,
    name: "Men's  Tee in black.",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    description: "Stay hydrated with this stylish tumbler.",
  },
  {
    id: 7,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
    description: "Never run out of pages for your notes.",
  },
  {
    id: 8,
    name: "Machined Mechanical ",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
    description: "Precision engineering for your writing needs.",
  },
  // More products...
];

export default function ProductList() {
  const { addToCart, getTotalQuantity } = useCart(); // Get the total quantity
  const [modalOpen, setModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false); // State for logout modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // Logout function
  const handleLogout = () => {
    // Perform logout logic here (e.g., clear user session, token, etc.)
    console.log("User logged out"); // Replace this with your actual logout logic
    setLogoutModalOpen(false); // Close modal after logout
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-10 flex justify-between items-center p-4 bg-green-100">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
          />
          <button
            onClick={() => console.log("Search for:", searchQuery)} // You can replace this with your search logic
            className="hidden sm:block ml-2 bg-green-500 text-white rounded-lg px-4 py-2"
          >
            Search
          </button>
        </div>
        <div className="flex items-center">
          <Link to="/cart" className="relative ml-4 flex items-center">
            <img src={cartImg} alt="Cart" className="h-8 w-8" />
            {getTotalQuantity() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalQuantity()}
              </span>
            )}
            <p>Cart</p>
          </Link>
          <button
            onClick={() => setLogoutModalOpen(true)} // Open logout modal
            className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 text-xs sm:text-xs md:px-4 md:py-2 md:text-base" // Adjusted responsive styling
          >
            Logout
          </button>
        </div>
      </header>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <NewProductModal
          open={modalOpen}
          setOpen={setModalOpen}
          product={selectedProduct}
        />
      )}
      <LogoutModal
        open={logoutModalOpen}
        setOpen={setLogoutModalOpen}
        onLogout={handleLogout} // Pass logout function
      />
    </div>
  );
}
