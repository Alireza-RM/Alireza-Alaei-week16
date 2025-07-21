import { useEffect, useState } from "react";
import ContactsList from "../components/ContactsList";
import Header from "../components/Header";
import AddFormContact from "../components/AddFormContact";
import Modal from "../components/Modal";
import toastComponenet from "../constants/toastComponent";
import { Toaster } from "react-hot-toast";
import { ContactContextData } from "../context/FilterContactContext";

function MainApp() {

    const { contactData, dispatch } = ContactContextData()

    const [search, setSearch] = useState("")
    const [deletesId, setDeletesId] = useState([])
    const [formContact, setFormContact] = useState({
        name: "",
        email: "",
        job: "",
        phone: "",
        id: `${Date.now()}`
    })

    const [isAddContact, setIsAddContact] = useState(false)
    const [isEditContact, setIsEditContact] = useState(false)
    const [isDeleteGroup, setIsDeleteGroup] = useState(false)
    const [isModalDelete, setIsModalDelete] = useState(false)



    useEffect(() => {
        async function getApi() {
            try {
                dispatch({ type: "loading" })
                const res = await fetch("http://localhost:3001/contacts")
                const data = await res.json()
                const newData = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
                dispatch({ type: "success", payload: newData })
            } catch (error) {
                dispatch({ type: "error", payload: "مشکلی در گرفتن دیتا پیش اومده" })
            }


        }

        getApi()

    }, [search, isAddContact, isEditContact, isModalDelete])





    const formContactHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormContact(prev => ({ ...prev, [name]: value }))
    }




    const addContactHandler = async (e, newError) => {
        e.preventDefault()
        if (Object.keys(newError).length) {
            toastComponenet("error", "red", "فرم را با دقت پر کنید")
            return
        }
        const newContact = contactData.data.filter(c => c.id == formContact.id)


        if (!!newContact.length) {
            putApi()
        } else {
            postApi()
        }



        async function postApi() {
            try {
                const res = await fetch("http://localhost:3001/contacts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formContact)
                })
                const data = await res.json()
                dispatch({ type: "addContact", payload: [...contactData.data, data] })
            } catch (error) {
                console.log("error")
            }

        }

        async function putApi() {
            try {
                const res = await fetch(`http://localhost:3001/contacts/${formContact.id.toString()}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formContact)
                })
                const data = await res.json()
                const newContact = contactData.data.filter(c => c.id !== data.id)

                dispatch({ type: "addContact", payload: [...newContact, data] })
            } catch (error) {
                console.log("error")
            }

        }


        setFormContact({
            name: "",
            email: "",
            job: "",
            phone: "",
            id: `${Date.now()}`
        })

        closeAddFormHandler()

        isEditContact ?
            toastComponenet("success", "blue", "مخاطب ویرایش شد !!")
            :
            toastComponenet("success", "green", "مخاطب به لیست مخاطبین اضافه شد")

    }


    const deleteContactHandler = () => {
        if (!deletesId.length) {
            return
        }


        deleteApi()
        async function deleteApi() {
            try {
                deletesId.forEach(async id => {
                    const res = await fetch(`http://localhost:3001/contacts/${id.toString()}`, {
                        method: "DELETE",
                    })
                    const data = await res.json()
                })
                const newContact = contactData.data.filter(c => !deletesId.includes(c.id))
                dispatch({ type: "deleteContact", payload: newContact })
            } catch (error) {
                console.log("error")
            }
        }

        setIsModalDelete(false)
        setDeletesId([])

        toastComponenet("success", "orange", `(${deletesId.length}) مخاطب حذف شد   `)
    }




    const closeAddFormHandler = () => {
        if (isAddContact) {
            setIsAddContact(false)
        }
        setIsModalDelete(false)
        setIsEditContact(false)
        setDeletesId([])
        setFormContact({
            name: "",
            email: "",
            job: "",
            phone: "",
            id: `${Date.now()}`
        })

    }





    return (
        <>
            <Header search={search} setSearch={setSearch} contactData={contactData} setIsAddContact={setIsAddContact}
                isDeleteGroup={isDeleteGroup} setIsDeleteGroup={setIsDeleteGroup} deleteContactHandler={deleteContactHandler}
                setDeletesId={setDeletesId} />

            <ContactsList contactData={contactData} isDeleteGroup={isDeleteGroup}
                setIsModalDelete={setIsModalDelete} setDeletesId={setDeletesId} setIsEditContact={setIsEditContact}
                setFormContact={setFormContact} />


            {
                isAddContact && <Modal closeAddFormHandler={closeAddFormHandler}>
                    <AddFormContact formContact={formContact} formContactHandler={formContactHandler}
                        addContactHandler={addContactHandler} />
                </Modal>
            }


            {
                isEditContact && <Modal closeAddFormHandler={closeAddFormHandler}>
                    <AddFormContact formContact={formContact} formContactHandler={formContactHandler} addContactHandler={addContactHandler} />
                </Modal>
            }



            {isModalDelete && <Modal closeAddFormHandler={closeAddFormHandler}>
                <div style={{
                    width: "100%", height: "100%", display: "flex", flexDirection: "column"
                    , gap: "20px", alignItems: "center"
                }}>

                    <p className="" style={{ width: "100%", textAlign: "center" }} >شما در حال حذف یکی از مخاطبین هستید !</p>
                    <p className="" style={{ width: "100%", textAlign: "center" }}>آیا مطمئن هستید ؟</p>
                    <div className="buttons" style={{ marginTop: "60px" }}>
                        <span className="button delete" onClick={() => deleteContactHandler()}>حذف</span>
                        <span className="button cancel" onClick={() => closeAddFormHandler()}>انصراف</span>
                    </div>
                </div>
            </Modal>}

            <Toaster />
        </>

    );
}

export default MainApp;


