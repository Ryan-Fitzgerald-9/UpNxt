import { FaGithub, FaLinkedin } from 'react-icons/fa'
import footerBg from '../assets/home3.png'

export default function Footer () {
    return (
        <div className="fixed bottom-0 w-full z-50">
            {/* Background image for the footer */}
            <img className="w-full h-[60px] bottom-0 object-cover" src={footerBg} alt="background" />
            {/* Gradient overlay for text visibility */}
            <div className="absolute inset-0 w-full h-[60px] bg-gradient-to-l from-black/70 to-transparent"></div>
            {/* Content of the footer, including name and social links */}
            <div className="absolute flex bottom-0 right-0 text-white p-4">
                <h3 className="text-gray-300 text-lg pr-2">Ryan Fitzgerald</h3>
                {/* Social links */}
                <div className="text-gray-300 flex space-x-2 mt-2">
                    {/* GitHub link */}
                    <a href="https://github.com/Ryan-Fitzgerald-9" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    {/* LinkedIn link */}
                    <a href="https://www.linkedin.com/in/ryan-fitzgerald-rf09" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </div>
    )
}