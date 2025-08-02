import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createContext, useContext } from "react";

const schema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .required("نام الزامی است")
        .min(3, "نام باید حداقل ۳ حرف باشد"),
    email: Yup.string().required("ایمیل الزامی است").email("ایمیل معتبر نیست"),
    job: Yup.string()
        .required("شغل الزامی است"),
    phone: Yup.string().required("تلفن همراه الزامی است").min(11, "حداقل ۱۱ کاراکتر لازم است")

});


const formProviderCTX = createContext()


function FormContext({ children }) {



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            id: `${Date.now()}`
        },
    });

    return (
        <formProviderCTX.Provider value={{ register, handleSubmit, reset, errors }}>
            {children}
        </formProviderCTX.Provider>
    )
}


const useFormData = () => {

    const data = useContext(formProviderCTX)
    return { ...data }
}

export { useFormData }

export default FormContext
