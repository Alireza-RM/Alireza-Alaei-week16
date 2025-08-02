
import "./Modal.css"

function Modal({ children, closeAddFormHandler }) {
    return (
        <div className="modal" >
            <div className="modalBackground" onClick={() => closeAddFormHandler()}></div>
            <div className="modalCenter">
                {children}
            </div>
        </div>
    )
}

export default Modal