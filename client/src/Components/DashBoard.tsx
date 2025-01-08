import Avatar from '../assets/avatar-blue10-100px.png';
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

interface User {
    username: string,
    email: string,
    JoinedDate: string,
    groups: [string]

}

const DashBoard: React.FC = () => {
    const [UserData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user } = context;

    async function getData() {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/getUserData`, {
            username: user
        })
        const data: any = response.data;
        const TypeData: User = {
            username: data.username,
            groups: data.groups,
            JoinedDate: data.JoinedDate,
            email: data.email
        }
        // console.log(data);
        setUserData(TypeData);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
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
                    <div className='flex justify-center flex-col items-center gap-2'>
                        <img src={Avatar} className='rounded-full w-20'></img>
                        <div className='font-bold text-[#333333] text-xl'>{user}</div>
                    </div>

                    <div className='flex flex-col justify-center items-center h-full mt-10'>
                        <div className="bg-gray-600 text-white p-4 rounded-md text-sm"><pre>{JSON.stringify(UserData, null, 2)}</pre></div>
                    </div>
                </>
            }
        </div>)
}
export default DashBoard;