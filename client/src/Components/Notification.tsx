import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import Settled from '../assets/settled.png';
import { ThreeDots } from 'react-loader-spinner';

interface notification {
    to: string,
    text: string,
    timestamp: string
}

const Notification: React.FC = () => {
    const [noti, setNoti] = useState<notification[]>([]);
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user } = context;

    const [loading, setloading] = useState(true);

    async function getNotifications() {
        const response = await axios.post<notification[]>(`${import.meta.env.VITE_API_URL}/getNotifications`, {
            username: user
        })

        const data: notification[] = response.data;
        setNoti(data);
        setloading(false);
    }

    useEffect(() => {
        getNotifications();
    }, [])

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    }

    const renderNotifications = noti.map((n, index) => {
        return (
            <div className='p-4 border-b-2 border-[#DDDDDD]' key={index}>
                <div className='font-bold text-[#5AC5A6]'>{formatDate(n.timestamp)}</div>
                <div>{n.text}</div>
            </div>

        )
    })
    return (<div>
        {loading && <div className="mt-20 flex justify-center">
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#5BC4A5"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>}

        {!loading &&
            <>
                <div className="bg-[#EEEEEE] font-bold p-2 text-xl text-[#333333]">Recent activity</div>
                <div>{renderNotifications}</div>
                {
                    noti.length == 0 &&
                    <div className=' flex p-6'>
                        <img src={Settled} ></img>
                        <div className='mt-10'>
                            <p className='font-bold text-2xl'>No Recent Activity</p>
                            <p className='text-[#999999] font-semibold text-sm'>we will notify you if you get new notification</p>
                        </div>
                    </div>
                }
            </>}
    </div>)
}
export default Notification;