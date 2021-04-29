import React, { useState } from 'react';
import Modal from 'react-modal'
import './Modal.css';


Modal.setAppElement('#root')
const CustomModal = (props) => {
    const [isOpen, setIsOpen] = useState(true)
    const type = props.type         // success or error -> determine the color
    const className = (type === 'success') ? 'ModalSuccess' : (type === 'warning') ? 'ModalWarning' :''

    const proceedHandler = () => {
        props.proceedHandler();
        setIsOpen(false)
    }

    const closeHandler = () => {
        if (props.closeHandler) {
            props.closeHandler()
        }
        setIsOpen(false)
    }


    const ProceedBtn = () => {
        return props.proceedHandler ?
            <button className="ProceedBtn" onClick={proceedHandler}>Yes</button> : ''
    }

    return (
        <div className="CustomModal">
            <Modal isOpen={isOpen}
                closeTimeoutMS={200}
                onRequestClose={() => setIsOpen(false)}
                className={"Modal " + className}
                overlayClassName="Overlay">
                <div className="ModalTitle">
                    <h2>{props.title}</h2>
                </div>

                <p>{props.body}</p>
                <div className="ModalBtns">
                    <ProceedBtn />
                    <button className="CloseBtn" onClick={closeHandler}>Close</button>
                </div>

            </Modal>
        </div>
    );
}

export default CustomModal;