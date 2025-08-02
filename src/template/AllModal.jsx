import Modal from '../components/Modal'
import AddFormContact from '../components/AddFormContact'

function AllModal({ isAddContact, isEditContact, isModalDelete, addContactHandler, deleteContactHandler, closeAddFormHandler,deletesId }) {
    return (
        <>
            {
                isAddContact &&
                <Modal closeAddFormHandler={closeAddFormHandler}>
                    <AddFormContact addContactHandler={addContactHandler} />
                </Modal>
            }

            {
                isEditContact &&
                <Modal closeAddFormHandler={closeAddFormHandler}>
                    <AddFormContact addContactHandler={addContactHandler} />
                </Modal>
            }

            {

                isModalDelete &&
                <Modal closeAddFormHandler={closeAddFormHandler}>
                    <div style={{
                        width: "100%", height: "100%", display: "flex", flexDirection: "column"
                        , gap: "20px", alignItems: "center"
                    }}>

                        <p className="" style={{ width: "100%", textAlign: "center" }} >
                            شما در حال حذف `<span style={{ color: "red" }}>{deletesId.length}</span>`  از مخاطبین هستید !
                        </p>
                        <p className="" style={{ width: "100%", textAlign: "center" }}>آیا مطمئن هستید ؟</p>
                        <div className="buttons" style={{ marginTop: "60px" }}>
                            <span className="button delete" onClick={() => deleteContactHandler()}>حذف</span>
                            <span className="button cancel" onClick={() => closeAddFormHandler()}>انصراف</span>
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}

export default AllModal