import React from 'react';

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-body">
          {props.message}
        </div>
        <button className="modal-button" onClick={() => props.setWarning('')}>Close</button>
      </div>
    </div>
  )
}

export default Modal;