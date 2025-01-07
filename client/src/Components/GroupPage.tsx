import { useParams } from "react-router-dom";
import GroupHome from "../assets/groupHome.png";
import { useEffect, useState } from "react";
import axios from 'axios';
import AddExpense from "./AddExpense";
import Bill from '../assets/Bill Type.png';

interface GroupData {
    _id: string,
    name: string,
    createdAt: string,
    createdBy: string,
    members: string[],
    transactions: string[]
}

interface Expense {
    _id: string,
    groupid: string,
    amount: number,
    perPerson: number,
    paidBy: string,
    paidFor: string,
    paidOn: string
}

const GroupPage: React.FC = () => {
    const { groupid } = useParams();
    const [groupData, setGroupData] = useState<GroupData | null>(null);
    const [showExpensePage, setShowExpensePage] = useState(false);
    const [transactions, setTractions] = useState<Expense[]>([]);
    const [reRender, setReRender] = useState(0);

    async function getGroupData() {
        const response = await axios.post(`http://localhost:8080/getgroupData`, {
            groupid: groupid
        })
        //console.log(response.data);
        const data = response.data;
        const gpdata: GroupData = {
            name: data.name,
            _id: data._id,
            createdAt: data.createdAt,
            createdBy: data.createdBy,
            members: data.members,
            transactions: data.transactions
        }
        setGroupData(gpdata);
    }

    useEffect(() => {
        getGroupData();
        getExpensesHistory();
    }, [groupid, reRender])

    function closeExpensePopup() {
        setShowExpensePage(false);
        setReRender(reRender + 1);
    }

    async function getExpensesHistory(): Promise<void> {
        const response = await axios.post(`http://localhost:8080/getGroupExpenseHistory`, {
            groupid: groupid
        });
        const data = response.data;
        const expenses: Expense[] = data;
        setTractions(expenses);
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    }

    const renderExpenses = transactions.map((t, index) => {
        return <div className="flex gap-2 items-center border-b-1 border-t-1 border-[#F8F8F8] p-2 shadow-sm" key={index}>
            <div className="w-[90px]">{formatDate(t.paidOn)}</div>
            <img src={Bill} className="w-12"></img>
            <p className="w-32">{t.paidFor}</p>
            <div>
                <p className="text-[12px] text-[#AAAAAA]">{t.paidBy} <span className="text-black">paid</span></p>
                <div>$ {t.amount}</div>
            </div>

        </div>
    })

    function calculateTotalExpense(): string {
        let sum: number = 0;
        transactions.forEach((t) => {
            sum += t.amount;
        })
        return sum.toFixed(2);
    }


    return (<div>

        {showExpensePage && <div className="fixed h-[100vh] w-[100vw] bg-black bg-opacity-50 top-0 left-0 flex justify-center ">
            <AddExpense groupData={groupData as GroupData} closeExpensePopup={closeExpensePopup} />
        </div>}


        <div className="flex items-center gap-1 bg-[#EEEEEE] p-2 justify-between">
            <img src={GroupHome} className="rounded-full w-9"></img>
            <div>
                <div className="font-bold text-2xl text-[#333333]">{groupData?.name}</div>
                <div className="text-sm text-[#369076] font-semibold">{groupid}</div>
            </div>

            <div className="flex gap-1 text-white">
                <button className="bg-[#FF652F] p-2 rounded-md text-sm" onClick={() => setShowExpensePage(true)}>Add Expense</button>
                <button className="bg-[#5AC5A6] p-2 rounded-md text-sm">Settle Up <span className="text-[10px]">(soon)</span></button>
            </div>
        </div>

        <div className="flex flex-col mt-8">{renderExpenses}</div>
        <div className="p-2 text-[#1AC29F] text-md">Total Group Expense <span className="font-bold">${calculateTotalExpense()}</span> </div>
    </div>)
}
export default GroupPage;