import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Modal = ({ isOpen, onClose, children, navigate }) => {
  const navigateTo = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white mx-2 p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => {
              onClose();
              navigateTo(navigate);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            <IoIosCloseCircleOutline size={24} />
          </button>
        </div>
        <div className="flex justify-center items-center">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
