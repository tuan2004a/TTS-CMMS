import { Link } from "react-router"

const Footer = () => {
    return (
        <div className="w-full text-center">
            <h1 className="text-gray-400">Job Interview <b className="font-medium">©{new Date().getFullYear()}</b></h1>
        </div>
    )
}

export default Footer
