interface GroupData {
    _id: string,
    name: string,
    createdAt: string,
    createdBy: string,
    members: string[],
    transactions: string[]
}

interface AddExpenseProp {
    groupData: GroupData
}

const AddExpense: React.FC<AddExpenseProp> = ({ groupData }) => {
    return (
        <div className="w-80 mt-52 bg-white h-80 rounded-md">
            <div className="bg-[#5CC5A6] text-white font-bold p-1 rounded-t-md pl-2">Add an Expense</div>
            <div className="border border-gray-400 pl-2">With <span className="font-bold">you</span> and All of <span className="font-bold">{groupData.name}</span></div>
            <div className="flex flex-col justify-center items-center">
                <input placeholder="Enter a description" className="text-xl outline-none border-dotted border-b-2 border-gray-400 w-44"></input>
                <div className="text-3xl">$<input placeholder="0.00" className="text-3xl outline-none border-dotted border-b-2 border-gray-400 w-16"></input></div>
            </div>
        </div>)
}
export default AddExpense;