// components/Modal.tsx
import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    message: string;
    header?: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, message ,header="Error"}) => {
    if (!show) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center z-50 flex-col items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-t-lg  p-3 w-96 h-32 flex flex-col  justify-evenly items-center">
                <h2 className={`font-bold ${header==="Success"?"text-green-500":""} `}>{header}</h2>
                <p className='text-center text-sm '>{message}</p>
            </div>
            <button className="bg-neutral-300 rounded-b-lg w-96 h-10" onClick={onClose}>ok</button>
        </div>
    );
};

export default Modal;
