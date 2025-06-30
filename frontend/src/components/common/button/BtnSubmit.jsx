const BtnSubmit = ({children, type, className, onClick}) => {
    return (
        <button onClick={onClick} type={type} className={`${className} text-center font-medium rounded-lg cursor-pointer leading-normal`}>
            {children}
        </button>
    )
}

export default BtnSubmit
