import { createContext, useContext, useReducer, useState } from "react"



const filterContactContext = createContext()

const initialState = {
    loading: false,
    data: [],
    error: ""
}

const reducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return { ...state, loading: true };
        case "success":
            return { ...state, data: action.payload, loading: false };
        case "error":
            return { error: action.payload, data: [], loading: false };
        case "addContact":
            return { ...state, data: action.payload }
        case "deleteContact":
            return { ...state, data: action.payload }
    }
}


function FilterContactContext({ children }) {
    const [contactData, dispatch] = useReducer(reducer, initialState)


    return (
        <filterContactContext.Provider value={{ contactData, dispatch }}>
            {children}
        </filterContactContext.Provider>
    )
}

export default FilterContactContext

const ContactContextData = () => {

    const data = useContext(filterContactContext)
    return data
}

export { ContactContextData }