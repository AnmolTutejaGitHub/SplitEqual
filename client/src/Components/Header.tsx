import Logo from '../assets/Splitwise_logo.png';
import { useContext, useState, useEffect, useRef } from "react";
import UserContext from "../Context/UserContext";
import Avtar from '../assets/avatar-blue10-100px.png';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const context = useContext(UserContext);
    const [show, setShow] = useState(false);
    if (!context) {
        throw new Error("User is undefined rn");
    }

    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser("");
        navigate("/");
    }
    const { user, setUser } = context;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShow(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
    }, []);


    return (<div className='p-5 flex flex-wrap justify-between pl-[8vw] pr-[8vw]'>
        <div className='w-32'>
            < img src={Logo} ></img >
        </div >

        {!user && <div className='flex gap-2 text-sm'>
            <div className='text-[#1AC29F] p-3 font-semibold cursor-pointer' onClick={() => navigate('/login')}>Log in</div>
            <div className='bg-[#1AC29F] p-3 text-white font-semibold rounded-md cursor-pointer border-b-2 border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:border-b-0' onClick={() => navigate('/signup')}>Sign up</div>
        </div>}

        {
            user &&
            <div>
                <div className='flex gap-1 items-center'>
                    <img src={Avtar} className='rounded-full w-7'></img>
                    <div className='font-bold text-[#34383C] text-md' onClick={() => setShow(!show)}>{user}</div>
                </div>
                {show && (
                    <div className='shadow-md p-2 absolute' ref={dropdownRef}>
                        <p onClick={() => navigate("/home/dashboard")}>Profile</p>
                        <button className='text-red-600' onClick={logout}>Log out</button>
                    </div>
                )}
            </div>
        }
    </div >)
}
export default Header;
