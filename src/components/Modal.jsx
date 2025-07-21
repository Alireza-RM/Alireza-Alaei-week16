
import "./Modal.css"

function Modal({ children, closeAddFormHandler }) {
    return (
        <div className="modal" >
            <div className="modalBackground" onClick={() => closeAddFormHandler()}></div>
            <div className="modalCenter">
                {/* <p>شما در حال حذف یکی از مخاطبین هستید !</p>
                <p>آیا مطمئن هستید ؟</p>
                <div className={styles.buttons}>
                    <span className={`${styles.button} ${styles.delete}`}>حذف</span>
                    <span className={`${styles.button} ${styles.cancel}`}>انصراف</span>
                </div> */}
                {children}
            </div>
        </div>
    )
}

export default Modal