const InputCheckBoxStatus = ({className, checkBox}) => {
    return (
        <label htmlFor={checkBox} className={`${className} box-border flex items-center cursor-pointer rounded-md bg-blue-600 `}>
            <input title="checkBoxStatus" id={checkBox} type="checkbox" className="appearance-none hidden peer" />
            <span className={` ring-2 ring-transparent ring-offset-0 size-full bg-gray-300 transition-all duration-200 rounded-md relative peer-checked:ring-blue-600 peer-checked:ring-offset-2 peer-checked:bg-transparent after:absolute after:bg-white after:rounded-full after:h-[3px] after:w-[13px] after:-rotate-50 after:transition-all after:duration-200 after:left-3 after:top-1/2 after:-translate-y-10 after:translate-x-10 peer-checked:after:-translate-x-[5.5px] peer-checked:after:-translate-y-[1px] before:absolute before:h-[3px] before:w-[9px] before:bg-white before:rounded-full before:top-1/2 before:left-1.5 before:-translate-y-10 before:-translate-x-10 before:rotate-40 before:transition-all before:duration-200 peer-checked:before:translate-y-[2px] peer-checked:before:-translate-x-[4px]`}></span>   
        </label>
    )
}

export default InputCheckBoxStatus
