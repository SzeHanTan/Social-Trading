import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, content, toggleModal }) => {
  return (
    <>
      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleModal}></div>
      <div className={`modal ${isOpen ? 'active' : ''}`}>
        <div className="modal-header">
          <h2>Summary</h2>
          <button onClick={toggleModal} className="close-button">&times;</button>
        </div>
        <div className="modal-content">
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

export default Modal;