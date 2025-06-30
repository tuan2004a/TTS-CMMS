const InputSeach = () => {
    return (
        <label className="flex items-center justify-between w-full  rounded-md bg-gray-200/50">
            <div className="text-[#99a1b7] w-10 text-center">
                <i className="fa-solid fa-magnifying-glass "></i>
            </div>
            <input type="text" className='w-full py-2.5 outline-none border-none rounded-md placeholder:text-zinc-400/70 placeholder:font-medium' placeholder='Tìm kiếm...' />
        </label>
    )
}

export default InputSeach
