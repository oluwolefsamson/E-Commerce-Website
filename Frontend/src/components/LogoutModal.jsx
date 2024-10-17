import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LogoutModal = ({ open, setOpen, onLogout }) => {
  const navigate = useNavigate(); // Initialize navigate

  if (!open) return null;

  const handleLogout = () => {
    onLogout(); // Call the logout function
    navigate("/"); // Navigate to the login page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-11/12 max-w-xs">
        <h2 className="text-lg font-semibold text-center">Logout</h2>
        <p className="mt-2 text-center">Are you sure you want to logout?</p>
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-300 text-gray-700 rounded px-3 py-2 sm:px-4 sm:py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout} // Use the new handleLogout function
            className="bg-red-600 text-white rounded px-3 py-2 sm:px-4 sm:py-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
