const Rows = ({children, className}) => {
    return (
        <td className={`pr-6 py-4  text-nowrap ${className}`}>
            {children}
        </td>
    )
}

export default Rows
