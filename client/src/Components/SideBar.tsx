import Logo from '../../src/assets/Logo.png';
import { FaFlag } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { IoMdPricetag } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Group {
    name: string,
    id: string,
    createdAt?: string
}

const SideBar: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user } = context;

    const [groups, setGroups] = useState<Group[]>([]);
    const [showAllGroups, setShowAllGroups] = useState<boolean>(false);
    const groupsToShow = showAllGroups ? groups : groups.slice(0, 3);
    const [email, setEmail] = useState('');

    const location = useLocation();
    const split = location.pathname.split('/');
    const groupId = split[split.length - 1];

    const navigate = useNavigate();
    const tweetMessage: string =
        `SplitEqual makes it easy to split expenses with housemates, trips, groups, friends, and family. Check it out! ${import.meta.env.VITE_API_URL}`;

    const handleTweetClick = (): void => {
        const twitterUrl: string = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            tweetMessage
        )}`;
        window.open(twitterUrl, "_blank");
    };

    async function getGroups() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/getUserGroups`, {
                username: user
            })
            setGroups(response.data as Group[]);
        } catch (e) { }
    }


    const renderGroups: JSX.Element[] = groupsToShow.map((group, index) => {
        return <div className={`flex gap-2 items-center ${groupId == group.id ? 'font-bold text-[#5AC5A6] border-l-4 border-[#5AC5A6] pl-1' : ''}`} key={index}>
            <IoMdPricetag />
            <div onClick={() => navigate(`/home/group/${group.id}`)} >{group.name}</div>
        </div>
    })

    useEffect(() => {
        getGroups();
    }, [])


    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    async function Invite() {
        const toastId = toast.loading('Inviting');
        try {
            if (!isValidEmail(email)) {
                toast.error('Enter a valid Email id');
                toast.dismiss(toastId);
                return;
            }
            await axios.post(`${import.meta.env.VITE_API_URL}/invite`, {
                username: user,
                email: email
            })
            toast.success('Invitation send');
        } catch (e) {
            toast.error('some error occurred');
        } finally {
            toast.dismiss(toastId);
        }
    }


    return (<div className='p-4 text-gray-500 text-sm pl-[55%] flex flex-col gap-2'>
        <div className={`flex gap-1 items-center hover:bg-[#EEEEEE] p-1 ${location.pathname.includes('dashboard') ? 'font-bold text-[#5AC5A6] border-l-4 border-[#5AC5A6] pl-1' : ''}`} onClick={() => navigate('/home/dashboard')}>
            <img src={Logo} className='w-6'></img>
            <div>Dashboard</div>
        </div>


        <div className={`flex gap-1 items-center hover:bg-[#EEEEEE] p-1 ${location.pathname.includes('notifications') ? 'font-bold text-[#5AC5A6] border-l-4 border-[#5AC5A6] pl-1' : ''}`} onClick={() => navigate('/home/notifications')}>
            <FaFlag />
            <div>Recent Activity</div>
        </div>

        <div className={`flex gap-1 items-center hover:bg-[#EEEEEE] p-1 ${location.pathname.includes('expenses') ? 'font-bold text-[#5AC5A6] border-l-4 border-[#5AC5A6] pl-1' : ''}`} onClick={() => navigate('/home/expenses')}>
            <TfiMenuAlt />
            <div>All Expenses</div>
        </div>

        <div>
            <div className='bg-[#F6F6F6] p-1 flex justify-between text-gray-400 hover:bg-[#EEEEEE]'>
                <div>Groups</div>
                <div className='hover:text-[#6ECAB0] cursor-pointer' onClick={() => navigate('/newGroup')}>+ add</div>
            </div>
            <div>{renderGroups}</div>
            <div className='cursor-pointer text-[12px] text-[#1AC29F]'>
                {groups.length > 4 && showAllGroups && <div onClick={() => setShowAllGroups(false)}>show less</div>}
                {groups.length > 4 && !showAllGroups && <div onClick={() => setShowAllGroups(true)}>show more</div>}
            </div>
        </div>


        {/* <div>
            <div className='bg-[#F6F6F6] p-1 flex justify-between text-gray-400 hover:bg-[#EEEEEE]'>
                <div>Friends</div>
                <div className='hover:text-[#6ECAB0] cursor-pointer'>+ add</div>
            </div>
        </div> */}


        <div className='border border-[#CCCCCC] flex flex-col gap-1'>
            <div className='p-1 bg-[#5AC5A6] text-white'>Invite friends</div>
            <input className="ml-2 mr-2 outline-none p-1 border border-[#CCCCCC] placeholder:text-[12px] rounded-sm" placeholder="Enter an email address" onChange={(e) => setEmail(e.target.value)} />
            <button className=" bg-gray-200 border border-gray-400 text-[11px] ml-2 text-black font-light rounded hover:bg-gray-300 focus:outline-none w-20 mb-2" onClick={Invite}>Send Invite</button>
        </div>


        <div className='flex gap-2'>
            <button onClick={handleTweetClick} className='flex items-center gap-2 text-md text-white bg-[#5069A2] p-1 rounded-sm w-20 shadow-sm border-1 border-gray-400'>
                <FaFacebookF />
                <div>Share</div>
            </button>
            <button onClick={handleTweetClick} className='flex items-center gap-2 text-md text-white bg-[#56A3FF] p-1 rounded-sm w-20 shadow-sm border-1 border-gray-400'>
                <FaTwitter />
                <div>Tweet</div>
            </button>
        </div>


    </div>)
}
export default SideBar;