import { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import Logo from '../assets/Logo-removebg-preview.png';
import toast from 'react-hot-toast';
import axios from 'axios';

interface Person {
    name: string,
    email: string,
}

interface GroupDetails {
    _id: string,
    name: string,
    createdAt: string,
    createdBy: string,
    members: string[]
}

const NewGroup: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user } = context;
    //console.log(user);

    const [persons, setPersons] = useState<Person[]>([]);
    const [count, setCount] = useState<number>(0);
    const [groupName, setGroupName] = useState<string>('');
    const notifyErr = (text: string) => toast.error(text);
    const notifySucc = (text: string) => toast.success(text);
    const [showGroupDetails, setShowGroupDetails] = useState<boolean>(false);
    const [groupDetails, setGroupDetails] = useState<GroupDetails | undefined>(undefined);

    function createAddPersonComponent(): JSX.Element {
        return (
            <div className="flex gap-1">
                <input placeholder="Name" className="pl-1 rounded-sm outline-none border border-[#CCCCCC]"></input>
                <input placeholder="Email Address" className="pl-1 rounded-sm outline-none border border-[#CCCCCC]"></input>
                <button onClick={(event) => addPerson(event)} >Save</button>
            </div>
        )
    }

    function renderPersonComponent(): JSX.Element[] {
        const output = [];
        for (let i = 0; i < count; i++) {
            const comp: JSX.Element = createAddPersonComponent();
            output.push(comp);
        }
        return output;
    }

    function addPerson(event: React.MouseEvent<HTMLButtonElement>): void {
        const parentDiv = event.currentTarget.parentElement;
        if (parentDiv) {
            const inputs = parentDiv.getElementsByTagName("input");
            const name = inputs[0]?.value.trim() || "";
            const email = inputs[1]?.value.trim() || "";

            if (name && email) {
                setPersons([...persons, { name: name, email: email }]);
                const buttons = parentDiv.getElementsByTagName("button");
                buttons[0].textContent = 'added';
                notifySucc('Addded to React State , validation will be performed at backend');
            }
            console.log(persons);

            if (!name || !email) {
                notifyErr("Please fill both fields");
            }
        }
    }


    async function sendGroupDataToBackend(): Promise<void> {
        const toastId = toast.loading('Posting...');
        try {
            if (!groupName) {
                notifyErr('Group Name not entered');
                return;
            }
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/createGroup`, {
                admin: user,
                groupName: groupName,
                persons: persons
            })
            console.log(response.data);
            const details: GroupDetails = {
                _id: response.data._id.toString(),
                name: response.data.name,
                createdAt: response.data.createdAt,
                createdBy: response.data.createdBy,
                members: response.data.members
            }

            setGroupDetails(details);
            toast.success('Created!');
            setShowGroupDetails(true);
        } catch (e) {
            toast.error('An error occurred');
        } finally {
            toast.dismiss(toastId);
        }
    }

    return (<div className="flex gap-12 justify-center mt-[100px]">
        <img src={Logo} className=" h-60"></img>
        <div className="flex flex-col gap-2">
            <div className="text-[#999999] text-md font-bold">START A NEW GROUP</div>
            <div className="text-xl">My group shall be called...</div>
            <input type="text" placeholder="Demonic Worship Expense" className="p-2 text-xl w-80 border border-[#CCCCCC] placeholder:text-[#CCCCCC] rounded-sm outline-none"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value)} value={groupName}></input>
            <div className="text-sm">
                <div className="text-[#999999] font-bold">GROUP MEMBERS</div>
                <p className="text-[#999999] text-[10px]">Tip: Lots of people to add? Send your friends an <span className="text-blue-500">invite link</span>.</p>
                <div className="flex flex-col gap-1">{renderPersonComponent()}</div>
                <div className="text-blue-500 text-[13px] cursor-pointer" onClick={() => setCount(count + 1)}>+ Add a person</div>
            </div>
            <button className="bg-[#FF652F] text-white p-2 text-md rounded-md w-16 border border-gray-400 shadow-sm" onClick={sendGroupDataToBackend}>Save</button>
            <div>
                <div className="border-l-4 border-red-600 p-2 text-sm">
                    <p className="">Note : Any Invalid or duplicate email id will be rejected by backend server</p>
                </div>
            </div>
            {showGroupDetails &&
                <div className="bg-gray-600 text-white p-4 rounded-md text-sm">
                    <pre>{JSON.stringify(groupDetails, null, 2)}</pre>
                </div>}
        </div>
    </div>)
}
export default NewGroup;