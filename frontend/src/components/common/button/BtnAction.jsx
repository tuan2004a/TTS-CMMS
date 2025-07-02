const BtnAction = ({children,dataTooltip, onClick, className}) => {
    return (
        <button onClick={onClick}  data-tooltip={dataTooltip} className={`${className} text-white border cursor-pointer size-8 rounded-md duration-250 relative after:content-[attr(data-tooltip)] after:text-xs after:rounded-md after:opacity-0 after:absolute after:transition-all after:duration-300 after:whitespace-nowrap after:bg-gray-700 after:text-white after:py-1 after:px-3 after:-top-8 after:left-1/2 after:-translate-x-1/2 before:absolute before:-top-2.5 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-8 before:border-t-gray-700 before:border-b-transparent before:border-r-transparent before:border-l-transparent before:transition-all before:duration-300 before:opacity-0 hover:before:opacity-100 hover:after:opacity-100` }>
            {children}
        </button>
    )
}

export default BtnAction
