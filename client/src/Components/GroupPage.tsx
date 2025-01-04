import { useParams } from "react-router-dom";
import GroupHome from "../assets/groupHome.png";
import { useEffect, useState } from "react";
import axios from 'axios';
import AddExpense from "./AddExpense";

interface GroupData {
    _id: string,
    name: string,
    createdAt: string,
    createdBy: string,
    members: string[],
    transactions: string[]
}

const GroupPage: React.FC = () => {
    const { groupid } = useParams();
    const [groupData, setGroupData] = useState<GroupData | null>(null);
    const [showExpensePage, setShowExpensePage] = useState(false);

    async function getGroupData() {
        const response = await axios.post(`http://localhost:8080/getgroupData`, {
            groupid: groupid
        })
        console.log(response.data);
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
    }, [groupid])


    return (<div>

        {showExpensePage && <div className="fixed h-[100vh] w-[100vw] bg-black bg-opacity-50 top-0 left-0 flex justify-center ">
            <AddExpense groupData={groupData as GroupData} />
        </div>}


        <div className="flex items-center gap-1 bg-[#EEEEEE] p-2 justify-between">
            <img src={GroupHome} className="rounded-full w-9"></img>
            <div>
                <div className="font-bold text-2xl text-[#333333]">{groupData?.name}</div>
                <div className="text-sm text-[#369076] font-semibold">{groupid}</div>
            </div>

            <div className="flex gap-1 text-white">
                <button className="bg-[#FF652F] p-2 rounded-md text-sm" onClick={() => setShowExpensePage(true)}>Add Expense</button>
                <button className="bg-[#5AC5A6] p-2 rounded-md text-sm">Settle Up</button>
            </div>
        </div>


    </div>)
}
export default GroupPage;