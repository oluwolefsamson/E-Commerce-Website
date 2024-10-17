// src/components/LogoutModal.jsx

import React from "react";

const LogoutModal = ({ open, setOpen, onLogout }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold">Logout</h2>
        <p className="mt-2">Are you sure you want to logout?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="mr-2 bg-gray-300 text-gray-700 rounded px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white rounded px-4 py-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
