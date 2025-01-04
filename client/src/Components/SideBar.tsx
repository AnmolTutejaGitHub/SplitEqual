import Logo from '../../src/assets/Logo.png';
import { FaFlag } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const SideBar: React.FC = () => {
    const tweetMessage: string =
        "Splitwise makes it easy to split expenses with housemates, trips, groups, friends, and family. Check it out!";

    const handleTweetClick = (): void => {
        const twitterUrl: string = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            tweetMessage
        )}`;
        window.open(twitterUrl, "_blank");
    };


    return (<div className='p-4 text-gray-500 text-sm pl-[55%] flex flex-col gap-2'>
        <div className='flex gap-1 items-center hover:bg-[#EEEEEE] p-1'>
            <img src={Logo} className='w-6'></img>
            <div>Dashboard</div>
        </div>


        <div className='flex gap-1 items-center hover:bg-[#EEEEEE] p-1'>
            <FaFlag />
            <div>Recent Activity</div>
        </div>

        <div className='flex gap-1 items-center hover:bg-[#EEEEEE] p-1'>
            <TfiMenuAlt />
            <div>All Expenses</div>
        </div>

        <div>
            <div className='bg-[#F6F6F6] p-1 flex justify-between text-gray-400 hover:bg-[#EEEEEE]'>
                <div>Groups</div>
                <div className='hover:text-[#6ECAB0] cursor-pointer'>+ add</div>
            </div>
        </div>


        <div>
            <div className='bg-[#F6F6F6] p-1 flex justify-between text-gray-400 hover:bg-[#EEEEEE]'>
                <div>Friends</div>
                <div className='hover:text-[#6ECAB0] cursor-pointer'>+ add</div>
            </div>
        </div>


        <div className='border border-[#CCCCCC] flex flex-col gap-1'>
            <div className='p-1 bg-[#5AC5A6] text-white'>Invite friends</div>
            <input className="ml-2 mr-2 outline-none p-1 border border-[#CCCCCC] placeholder:text-[12px] rounded-sm" placeholder="Enter an email address" />
            <button className=" bg-gray-200 border border-gray-400 text-[11px] ml-2 text-black font-light rounded hover:bg-gray-300 focus:outline-none w-20 mb-2">Send Invite</button>
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