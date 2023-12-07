import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer () {
    return (
        <div className="absolute bottom-2 right-2 flex">
            <h3 className=" text-white">Ryan Fitzgerald</h3>
            <div className='text-white p-2 flex'>
                {/* <Link to='/https://github.com/Ryan-Fitzgerald-9' > <FaGithub /> </Link>
                <Link to='/https://www.linkedin.com/in/ryan-fitzgerald-rf09' > <FaLinkedin /> </Link>                     */}
            </div>
        </div>
    )
}