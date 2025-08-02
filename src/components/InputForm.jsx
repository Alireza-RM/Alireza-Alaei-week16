
function InputForm({ label, name, register, errors }) {

    return (
        <div className="rowDetail">
            <div>
                <p>{label}:</p>
                <input type="text" name={name}  {...register(name)}
                />
            </div>
            {
                errors[name] &&
                <p style={{ fontSize: "15px", color: "red" }}>{errors[name].message}</p>
            }
        </div>
    )
}

export default InputForm