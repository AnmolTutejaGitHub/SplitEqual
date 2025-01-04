import { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import Logo from '../assets/Logo-removebg-preview.png';

interface Person {
    Name: string,
    Email: string,
}

const NewGroup: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user, setUser } = context;
    console.log(user);

    const [persons, setPersons] = useState<Person[]>([]);
    const [count, setCount] = useState<number>(0);

    function createAddPersonComponent(): JSX.Element {
        return (
            <div className="flex gap-1">
                <input placeholder="Name" className="pl-1 rounded-sm outline-none border border-[#CCCCCC]"></input>
                <input placeholder="Email Address" className="pl-1 rounded-sm outline-none border border-[#CCCCCC]"></input>
                <button onClick={(event) => addPerson(event)}>Save</button>
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
            const name = inputs[0]?.value || "";
            const email = inputs[1]?.value || "";

            if (name && email) {
                setPersons([...persons, { Name: name, Email: email }]);
            }
            setPersons([...persons, { Name: name, Email: email }])
        }
    }

    return (<div className="flex gap-12 justify-center mt-[100px]">
        <img src={Logo} className=" h-60"></img>
        <div className="flex flex-col gap-2">
            <div className="text-[#999999] text-md font-bold">START A NEW GROUP</div>
            <div className="text-xl">My group shall be called...</div>
            <input type="text" placeholder="Demonic Worship Expense" className="p-2 text-xl w-80 border border-[#CCCCCC] placeholder:text-[#CCCCCC] rounded-sm outline-none"></input>
            <button className="bg-[#FF652F] text-white p-2 text-md rounded-md w-16 border border-gray-400 shadow-sm">Save</button>

            <div className="text-sm">
                <div className="text-[#999999] font-bold">GROUP MEMBERS</div>
                <p className="text-[#999999] text-[10px]">Tip: Lots of people to add? Send your friends an <span className="text-blue-500">invite link</span>.</p>
                <div>{renderPersonComponent()}</div>
                <div className="text-blue-500 text-[13px] cursor-pointer" onClick={() => setCount(count + 1)}>+ Add a person</div>
            </div>
        </div>
    </div>)
}
export default NewGroup;