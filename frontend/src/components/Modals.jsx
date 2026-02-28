import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null; //DON'T RENDER IF MODAL IS CLOSED

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>

        {/* MODAL TITLE */}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {/* MODAL CONTENT */}
        <div>{children}</div>
      </div>
    </div>
  );
}
