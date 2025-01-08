import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from "react";
import UserContext from "../Context/UserContext";
import Settled from '../assets/settled.png';
import { ThreeDots } from 'react-loader-spinner';

interface expense {
    to: string,
    text: string,
    timestamp: string
}

const Expense: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user } = context;
    console.log(user);

    const [expenses, setExpenses] = useState<expense[]>([]);
    const [loading, setloading] = useState(true);

    async function getExpenses() {
        const response = await axios.post<expense[]>(`${import.meta.env.VITE_API_URL}/getExpense`, {
            username: user
        })

        const data: expense[] = response.data;
        console.log(data);
        setExpenses(data);
        setloading(false);
    }

    useEffect(() => {
        getExpenses();
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

    const renderExpense = expenses.map((n, index) => {
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
        {!loading && <>
            <div className="bg-[#EEEEEE] font-bold p-2 text-xl text-[#333333]">All Expenses</div>
            <div>{renderExpense}</div>
            {
                expenses.length == 0 &&
                <div className=' flex p-6'>
                    <img src={Settled} ></img>
                    <div className='mt-10'>
                        <p className='font-bold text-2xl'>No Expense</p>
                        <p className='text-[#999999] font-semibold text-sm'>You are pro , you managed with no expense. Owe or lend someone in a group</p>
                    </div>
                </div>
            }
        </>}
    </div>)
}
export default Expense;