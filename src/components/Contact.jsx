import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { useFormData } from "../context/FormContext"

function Contact({ data, styles, isDeleteGroup, setIsModalDelete, setDeletesId, setIsEditContact }) {

    const { reset } = useFormData()


    const { name, email, id, phone, job } = data

    const [isMore, setIsMore] = useState(true)

    const checkBoxHandler = () => {
        setDeletesId(p => {
            if (!p.length) {
                return [id]
            } else {
                return p.includes(id) ? p.filter(i => i !== id) : [...p, id]
            }
        })
    }


    const editHandler = () => {
        reset({ name, email, id, phone, job })
        setIsEditContact(p => !p)
    }


    return (
        <div className={styles.contact}>
            <div>{name}</div>
            <div>{email}</div>
            <div className={styles.more}>
                {

                    isDeleteGroup ?

                        <label className={styles.customCheckbox}>
                            <input type="checkbox" id={id} onClick={() => checkBoxHandler()} />
                            <span className={styles.checkmark}></span>
                        </label>

                        :
                        isMore ?

                            <span style={{ color: "#000" }} onClick={() => setIsMore(prev => !prev)}>{<BsThreeDots />}</span>
                            :
                            <>
                                <span className={`${styles.button} ${styles.delete}`}
                                    onClick={() => {
                                        setIsModalDelete(prev => !prev)
                                        checkBoxHandler()
                                    }}>
                                    حذف
                                </span>
                                <span className={`${styles.button} ${styles.edit}`} onClick={() => editHandler()}>ویرایش</span>
                            </>}
            </div>


        </div>
    )
}

export default Contact