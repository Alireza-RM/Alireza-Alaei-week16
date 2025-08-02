

import { useFormData } from "../context/FormContext"

import inputDetail from "../constants/inputFormData"

import "./AddFormContact.css"
import InputForm from "./InputForm"

function AddFormContact({ addContactHandler }) {

    const { register, handleSubmit, errors, } = useFormData()

    return (
        <form onSubmit={handleSubmit(addContactHandler)} >
            <div>
                {
                    inputDetail.map((i) => (
                        <InputForm key={i.name} register={register} errors={errors} {...i} />
                    ))
                }
            </div>

            <div className="divButton">
                <button className="addButton" type="submit">افزودن</button>
            </div>

        </ form>
    )
}

export default AddFormContact