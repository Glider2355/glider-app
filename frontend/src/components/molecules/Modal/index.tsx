import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div
      className="fixed z-50 inset-0 bg-black bg-opacity-30 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 m-2 max-w-xl mx-auto flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
