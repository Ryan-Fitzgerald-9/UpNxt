import { FaGithub, FaLinkedin } from 'react-icons/fa'
import footerBg from '../assets/home3.png'

export default function Footer () {
    return (
        <div className="absolute bottom-0 w-full">
            <img className="w-full h-[60px] bottom-0 object-cover" src={footerBg} alt="background" />
            <div className="absolute inset-0 w-full h-[60px] bg-gradient-to-l from-black/60 to-transparent"></div>
            <div className="absolute flex bottom-0 right-0 text-white p-4">
                <h3 className="text-white text-lg pr-2">Ryan Fitzgerald</h3>
                <div className="text-gray-300 flex space-x-2 mt-2">
                    <a href="https://github.com/Ryan-Fitzgerald-9" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/ryan-fitzgerald-rf09" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </div>
    )
}