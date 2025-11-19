import { IoMdClose } from "react-icons/io";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Transition
      show={isOpen}
      enter="transition duration-50 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-50 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className=" p-6 rounded-lg shadow-lg relative z-50 max-w-2xl modal-bg">
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 hover:bg-gray-100 rounded-full focus:outline-none"
            >
              <IoMdClose className="w-6 h-6 bg-white text-gray-400 rounded-full" />
            </button>
            {children}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
