import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useFormData } from "../context/FormContext";
import ContactsList from "../components/ContactsList";
import Header from "../components/Header";
import { ContactContextData } from "../context/FilterContactContext";
import toastComponent from "../constants/toastComponent";
import { api } from "../services/api";
import AllModal from "./AllModal";


function MainApp() {

    const { reset } = useFormData()

    const { contactData, dispatch } = ContactContextData()

    const [search, setSearch] = useState("")
    const [deletesId, setDeletesId] = useState([])

    const [isAddContact, setIsAddContact] = useState(false)
    const [isEditContact, setIsEditContact] = useState(false)
    const [isDeleteGroup, setIsDeleteGroup] = useState(false)
    const [isModalDelete, setIsModalDelete] = useState(false)

    useEffect(() => {
        async function getApi() {
            try {
                dispatch({ type: "loading" })
                const { data } = await api.get("")
                const newData = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
                dispatch({ type: "success", payload: newData })
            } catch (error) {
                dispatch({ type: "error", payload: "مشکلی در گرفتن دیتا پیش اومده" })
            }
        }
        getApi()

    }, [search, isAddContact, isEditContact, isModalDelete])


    const addContactHandler = async (data) => {
        const dataForm = data
        const newContact = contactData.data.filter(c => c.id === dataForm.id)

        if (!!newContact.length) {
            putApi()
        } else {
            postApi()
        }

        async function postApi() {
            try {
                const res = await api.post("", { ...dataForm })
                dispatch({ type: "addContact", payload: [...contactData.data, res] })
            } catch (error) {
                console.log("error")
            }
        }

        async function putApi() {
            try {
                const res = await api.put(`/${dataForm.id.toString()}`, { ...dataForm })
                const newContact = contactData.data.filter(c => c.id !== data.id)
                dispatch({ type: "addContact", payload: [...newContact, res] })
            } catch (error) {
                console.log("error")
            }
        }

        closeAddFormHandler()

        isEditContact ?
            toastComponent("success", "blue", "مخاطب ویرایش شد !!")
            :
            toastComponent("success", "green", "مخاطب به لیست مخاطبین اضافه شد")

    }

    const deleteContactHandler = async () => {
        if (!deletesId.length) {
            return
        }

        try {
            deletesId.forEach(async id => {
                const res = await api.delete(`/${id.toString()}`, {
                    method: "DELETE",
                })

            })
            const newContact = contactData.data.filter(c => !deletesId.includes(c.id))
            dispatch({ type: "deleteContact", payload: newContact })
        } catch (error) {
            console.log("error")
        }

        setIsModalDelete(false)
        setDeletesId([])

        toastComponent("success", "orange", `(${deletesId.length}) مخاطب حذف شد   `)
    }

    const closeAddFormHandler = () => {
        if (isAddContact) {
            setIsAddContact(false)
        }
        setIsModalDelete(false)
        setIsEditContact(false)
        setDeletesId([])
        reset({
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
                deletesId={deletesId} setDeletesId={setDeletesId} setIsModalDelete={setIsModalDelete} />

            <ContactsList contactData={contactData} isDeleteGroup={isDeleteGroup} setIsModalDelete={setIsModalDelete}
                setDeletesId={setDeletesId} setIsEditContact={setIsEditContact} />

            <AllModal isAddContact={isAddContact} isEditContact={isEditContact} isModalDelete={isModalDelete} deletesId={deletesId}
                addContactHandler={addContactHandler} deleteContactHandler={deleteContactHandler} closeAddFormHandler={closeAddFormHandler} />
            <Toaster />
        </>

    );
}

export default MainApp;