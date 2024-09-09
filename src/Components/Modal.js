import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from './ModalSlice';
import AuthForm from './AuthForm';

const Modal = ({ show, children }) => {
  const dispatch = useDispatch();
  const modalName = useSelector(state => state.modal.modalName)

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
        {modalName === 'Login' && (
         <AuthForm/>
        )}
      </div>
    </div>
  );
};

export default Modal;
