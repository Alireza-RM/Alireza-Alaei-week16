import { useState } from "react"
import validationForm from "../utility/validationForm"


import "./AddFormContact.css"

function AddFormContact({ formContact, formContactHandler, addContactHandler }) {

    const [formFocoused, setFormFocoused] = useState({
        name: false,
        email: false,
        job: false,
        phone: false
    })

    const focousedHandler = (e) => {
        const name = e.target.name
        setFormFocoused(prev => ({ ...prev, [name]: true }))
    }


    const newError = validationForm(formContact)




    return (
        <form onSubmit={(e) => addContactHandler(e, newError)}>
            <div>

                <div className="rowDetail">
                    <div>
                        <p>نام و نام خوانوادگی :</p>
                        <input type="text" name="name" value={formContact.name} onChange={(e) => formContactHandler(e)}

                            onFocus={(e) => focousedHandler(e)}
                        />
                    </div>
                    {
                        newError.name && formFocoused.name &&
                        <p style={{ fontSize: "15px", color: "red" }}>{newError.name}</p>
                    }
                </div>



                <div className="rowDetail">
                    <div>
                        <p>ایمیل :</p>
                        <input type="text" name="email" value={formContact.email} onChange={(e) => formContactHandler(e)}
                            onFocus={(e) => focousedHandler(e)} />
                    </div>
                    {
                        newError.email && formFocoused.email &&
                        <p style={{ fontSize: "15px", color: "red" }}>{newError.email}</p>
                    }
                </div>



                <div className="rowDetail">
                    <div>
                        <p>شغل :</p>
                        <input type="text" name="job" value={formContact.job} onChange={(e) => formContactHandler(e)}
                            onFocus={(e) => focousedHandler(e)} />
                    </div>
                    {
                        newError.job && formFocoused.job &&
                        <p style={{ fontSize: "15px", color: "red" }}>{newError.job}</p>
                    }
                </div>



                <div className="rowDetail">
                    <div>
                        <p>تلفن همراه :</p>
                        <input type="text" name="phone" value={formContact.phone} onChange={(e) => formContactHandler(e)}
                            onFocus={(e) => focousedHandler(e)} />
                    </div>
                    {
                        newError.phone && formFocoused.phone &&
                        <p style={{ fontSize: "15px", color: "red" }}>{newError.phone}</p>
                    }
                </div>
            </div>

            <div className="divButton">
                <button className="addButton" type="submit">افزودن</button>
            </div>
        </form>
    )
}

export default AddFormContact