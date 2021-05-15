import React from 'react'
import ReactDOM from 'react-dom'
import './ResetPasswordModal.css'

function ResetPasswordModal(props) {

    return ReactDOM.createPortal(
        <div className={`modal ${props.show ? `show` : ``}`} onClick={props.onClose}>
            <div className="modal-content" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Reset Password</h4>
                </div>
                <div className="modal-body">
                    This is modal body
                </div>
                <div className="modal-footer">
                    <button 
                    onClick={props.onClose}
                    className="button">
                        Close
                    </button>
                </div>
            </div>
            
        </div>
    ,document.getElementById('root'))
}

export default ResetPasswordModal
