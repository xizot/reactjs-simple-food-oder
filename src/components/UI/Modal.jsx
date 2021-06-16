import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
const Backdrop = ({ onClose }) => {
    return <div className={classes.backdrop} onClick={onClose}></div>;
};
const ModalOverlay = ({ children }) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{children}</div>
        </div>
    );
};
const portalElement = document.getElementById("overlay");
function Modal({ children, onClick }) {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onClose={onClick} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay>{children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
}
export default Modal;
