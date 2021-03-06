import React, { useState } from 'react';
import Modal from 'react-modal'
import './Modal.css';


Modal.setAppElement('#root')
const CustomModal = (props) => {
    const [isOpen, setIsOpen] = useState(true)
    const type = props.type
    const className = (type === 'success') ? 'ModalSuccess' : ''

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
                <button className="CloseBtn" onClick={() => setIsOpen(false)}>Close</button>
            </Modal>
        </div>
    );
}

export default CustomModal;