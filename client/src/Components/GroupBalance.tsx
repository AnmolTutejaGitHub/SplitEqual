import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import Settled from '../assets/settled.png';

interface OwnerExpense {
    name: string,
    amount: number
}

interface Debt {
    from: string;
    to: string;
    amount: number;
}

interface GroupData {
    _id: string,
    name: string,
    createdAt: string,
    createdBy: string,
    members: string[],
    transactions: string[]
}

const GroupBalance: React.FC = () => {
    const { groupid } = useParams();
    const [ownersExpenses, setOwnersExpenses] = useState<OwnerExpense[]>([]);
    const [debts, setDebts] = useState<Debt[]>([]);
    const [groupData, setGroupData] = useState<GroupData | null>(null);

    async function getIndividualExpense(): Promise<void> {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/IndividualGroupExpense`, {
            groupid: groupid
        })
        const data: OwnerExpense[] = response.data;
        setOwnersExpenses(data);
    }

    function calculateDebts() {
        const owes: Debt[] = [];
        const length = ownersExpenses.length;

        for (let i = 0; i < ownersExpenses.length; i++) {
            let member = ownersExpenses[i].name;
            let amount = ownersExpenses[i].amount;
            for (let j = i + 1; j < ownersExpenses.length; j++) {
                const diff = (amount / length) - (ownersExpenses[j].amount / length);
                if (diff > 0) {
                    owes.push({ from: ownersExpenses[j].name, to: member, amount: diff });
                } else if (diff < 0) {
                    owes.push({ from: member, to: ownersExpenses[j].name, amount: Math.abs(diff) });
                }
            }
        }

        setDebts(owes);
    }

    async function getGroupData() {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/getgroupData`, {
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

    const renderDebts = debts.map((debt, index) => (
        <div key={index} className="p-2">
            <p>
                <span className="italic">{debt.from}</span> owes <span className="font-bold">{debt.to}</span> <span className="text-red-500">${debt.amount.toFixed(2)}</span>
            </p>
        </div>
    ));

    useEffect(() => {
        getData();
    }, [groupid])

    useEffect(() => {
        calculateDebts();
    }, [ownersExpenses])

    async function getData() {
        await getGroupData();
        await getIndividualExpense();
    }

    const renderOwnersExpenses = ownersExpenses.map((owner, index) => {
        const tailwind = index % 2 === 0
            ? 'text-orange-600'
            : 'text-green-600';
        return (
            <div key={owner.name} className={`${tailwind} p-2`}>
                <p>
                    <span className="italic">{owner.name}</span> paid <span className="">${owner.amount.toFixed(2)}</span>
                </p>
            </div>
        );
    });
    return (<div className="p-4">
        <div className="font-bold text-[#6A7280] text-sm">GROUP BALANCES</div>
        <div className="bg-gray-100 font-bold">{renderOwnersExpenses}</div>
        <div className="mt-4 font-bold text-[#6A7280] text-sm">SETTLEMENTS</div>
        <div className="bg-gray-100 font-bold">{renderDebts}</div>
        {debts.length == 0 &&
            <div className="mt-6 flex">
                <img src={Settled} className="h-96"></img>
                <div className="mt-10">
                    <div className="font-bold text-2xl">Your Group is Settled</div>
                    <p className="text-sm text-[#999999] font-semibold">We will tell who owes who and how much</p>
                </div>
            </div>
        }
    </div>)
}
export default GroupBalance;