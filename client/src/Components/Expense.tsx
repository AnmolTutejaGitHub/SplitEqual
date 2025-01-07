import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from "react";
import UserContext from "../Context/UserContext";
import Settled from '../assets/settled.png';

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
    const { user, setUser } = context;
    console.log(user);

    const [expenses, setExpenses] = useState<expense[]>([]);

    async function getExpenses() {
        const response = await axios.post(`http://localhost:8080/getExpense`, {
            username: user
        })

        const data: expense[] = response.data;
        setExpenses(data);
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

    const renderExpense = expenses.map((n) => {
        return (
            <div className='p-4 border-b-2 border-[#DDDDDD]'>
                <div className='font-bold text-[#5AC5A6]'>{formatDate(n.timestamp)}</div>
                <div>{n.text}</div>
            </div>

        )
    })


    return (<div>
        <div className="bg-[#EEEEEE] font-bold p-2 text-xl text-[#333333]">All Expenses</div>
        <div>{renderExpense}</div>
        {
            expenses.length == 0 &&
            <div className=' flex p-6'>
                <img src={Settled} ></img>
                <div className='mt-10'>
                    <p className='font-bold text-2xl'>No Expense</p>
                    <p className='text-[#999999] font-semibold text-sm'>You are pro , you managed with no expense</p>
                </div>
            </div>
        }
    </div>)
}
export default Expense;