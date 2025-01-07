import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import UserContext from "../Context/UserContext";
import { useContext } from "react";
import toast, { Toaster } from 'react-hot-toast';

interface GroupData {
    _id: string,
    name: string,
    createdAt: string,
    createdBy: string,
    members: string[],
    transactions: string[]
}

interface AddExpenseProp {
    groupData: GroupData,
    closeExpensePopup: () => void
}

const AddExpense: React.FC<AddExpenseProp> = ({ groupData, closeExpensePopup }) => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user, setUser } = context;

    const [amount, setAmount] = useState<number>(0);
    const today = new Date().toISOString().split("T")[0];
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };
    const [description, setDesction] = useState<string>('');

    async function sendDataToDatabase() {
        const toastId = toast.loading('Adding...');
        try {
            if (!description.trim()) {
                toast.dismiss(toastId);
                return toast.error('Description is required');
            }
            if (amount == 0) {
                toast.dismiss(toastId);
                return toast.error(`can't have $0 as expense`);
            }

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/addExpense`, {
                groupid: groupData._id,
                amount: amount,
                paidBy: user,
                description: description,
                paidOn: selectedDate,
            });
            toast.success('Success');
        } catch (e) {
            toast.error('Some Error Occurred');
            console.error(e);
        } finally {
            toast.dismiss(toastId);
        }
    }


    return (
        <div className="w-80 mt-52 bg-white h-80 rounded-md">
            <div className="bg-[#5CC5A6] text-white font-bold p-1 rounded-t-md pl-2 flex items-center justify-between"><div>Add an Expense </div><div className="cursor-pointer" onClick={() => closeExpensePopup()}><IoMdClose /></div></div>
            <div className="border border-gray-400 pl-2">With <span className="font-bold">you</span> and All of <span className="font-bold">{groupData.name}</span></div>
            <div className="flex flex-col justify-center items-center">
                <input placeholder="Enter a description" className="text-xl outline-none border-dotted border-b-2 border-gray-400 w-44"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setDesction(e.currentTarget.value)}
                ></input>
                <div className="text-3xl">$<input placeholder="00.00" className="text-3xl outline-none border-dotted border-b-2 border-gray-400 w-[5ch]" type="number" min="0" onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.style.width = `${Math.max(5, target.value.length)}ch`;
                }}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setAmount(Number(e.currentTarget.value))}
                ></input></div>
                <p>Paid by you and split equally</p>
                <p>${amount / groupData.members.length}/person</p>
            </div>
            <p className="text-center">{groupData.members.length} Member(s)</p>
            <div className="flex justify-center">
                <input
                    id="date-input"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="border rounded"
                />
            </div>
            <div className="flex justify-center mt-5"><button className="bg-[#5CC5A6] rounded-md text-white p-2" onClick={sendDataToDatabase}>Save</button></div>
        </div>)
}
export default AddExpense;