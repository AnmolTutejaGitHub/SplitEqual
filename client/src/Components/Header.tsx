import Logo from '../assets/Splitwise_logo.png';
import { useContext } from "react";
import UserContext from "../Context/UserContext";
import Avtar from '../assets/avatar-blue10-100px.png';

const Header: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user, setUser } = context;
    return (<div className='p-5 flex flex-wrap justify-between pl-[8vw] pr-[8vw]'>
        <div className='w-32'>
            < img src={Logo} ></img >
        </div >

        {!user && <div className='flex gap-2 text-sm'>
            <div className='text-[#1AC29F] p-3 font-semibold'>Log in</div>
            <div className='bg-[#1AC29F] p-3 text-white font-semibold rounded-md cursor-pointer border-b-2 border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:border-b-0'>Sign up</div>
        </div>}

        {
            user && <div className='flex gap-1 items-center'>
                <img src={Avtar} className='rounded-full w-7'></img>
                <div className='font-bold text-[#34383C] text-md'>{user}</div>
            </div>
        }
    </div >)
}
export default Header;
