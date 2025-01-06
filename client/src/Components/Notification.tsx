import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";

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
    const { user, setUser } = context;

    async function getNotifications() {
        const response = await axios.post(`http://localhost:8080/getNotifications`, {
            username: user
        })

        const data: notification[] = response.data;
        console.log("Hello", data);
        setNoti(data);
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

    const renderNotifications = noti.map((n) => {
        return (
            <div className='p-4 border-b-2 border-[#DDDDDD]'>
                <div className='font-bold text-[#5AC5A6]'>{formatDate(n.timestamp)}</div>
                <div>{n.text}</div>
            </div>

        )
    })
    return (<div>
        <div className="bg-[#EEEEEE] font-bold p-2 text-xl text-[#333333]">Recent activity</div>
        <div>{renderNotifications}</div>
    </div>)
}
export default Notification;