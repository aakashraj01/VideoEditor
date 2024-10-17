import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-3 right-3 text-xl font-semibold"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;