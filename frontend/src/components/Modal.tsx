import React, { useState } from 'react';
import '../assets/styles/modal.css';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>This is a modal!</p>
      </div>
    </div>
  );
}

export default Modal;