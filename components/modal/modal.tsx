import './modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return(
        <div className='modal'>
            <div className='modal-body'>
                {children}
                <button className='modal-close-button' onClick={onClose}>
                    Close
                </button>
            </div>

        </div>
    )
}

export default Modal;