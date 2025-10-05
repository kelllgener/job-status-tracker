import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="animate-fade-out fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20">
            <div className="relative w-11/12 max-w-md rounded-lg bg-white px-6 py-4 shadow-lg dark:bg-gray-800">
                <div className="mb-3 flex flex-row items-center justify-between border-b border-gray-200 py-2">
                    {/* Modal title */}
                    {title && <h2 className="text-lg font-semibold">{title}</h2>}

                    {/* Close button */}
                    <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        ✕
                    </button>
                </div>

                {/* Modal content */}
                <div>{children}</div>

                <div></div>
            </div>
        </div>
    );
};

export default Modal;
