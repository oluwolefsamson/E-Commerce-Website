// ProductList.jsx
import { useState } from "react";
import { useCart } from "../../components/CartContext";
import NewProductModal from "../../components/NewProductModal.jsx";
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
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
    description: "Precision engineering for your writing needs.",
  },
  // More products...
];

export default function ProductList() {
  const { addToCart, getTotalQuantity } = useCart(); // Get the total quantity
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      <header className="flex justify-between items-center p-4 bg-green-100">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full max-w-md" // Changed max-w-xs to max-w-md
          />

          <button
            onClick={() => console.log("Search for:", searchQuery)} // You can replace this with your search logic
            className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Search
          </button>
        </div>
        <Link to="/cart" className="relative ml-4 flex items-center">
          <img
            src={cartImg} // Replace with your cart icon URL
            alt="Cart"
            className="h-8 w-8"
          />
          {getTotalQuantity() > 0 && ( // Show the item count if greater than 0
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalQuantity()}
            </span>
          )}
          <p>Cart</p>
        </Link>
      </header>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
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
    </div>
  );
}
