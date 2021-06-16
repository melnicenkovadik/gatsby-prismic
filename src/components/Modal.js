import React from "react";
import ReactDOM from "react-dom";


const Modal = ({isShowing, hide, children = null}) => {
    return isShowing
        ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="modal-overlay"
                />
                <div
                    className="modal-wrapper"
                    aria-modal
                    aria-hidden
                    tabIndex={-1}
                    role="dialog"
                >
                    <div
                        className="modal"
                    >
                        <button
                            type="button"
                            className="modal-close-button"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={hide}
                        >
                            &times;
                        </button>
                        {children}
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
        : null;
};

export default Modal;
