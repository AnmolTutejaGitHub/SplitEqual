import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from "react";
import UserContext from "../Context/UserContext";
import axios, { AxiosError } from 'axios';

const RightSidePassword: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user, setUser } = context;

    const [currPassword, setCurrPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    async function changePassword() {
        const toastId = toast.loading('Updating...');
        if (currPassword.trim() == '' || newPassword.trim() == '') {
            toast.error("Provide both current & new Password");
            toast.dismiss(toastId);
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/changePassword`, {
                username: user,
                currPassword: currPassword,
                newPassword: newPassword
            })
            console.log(response);
            toast.success('Password changed successfully');
        } catch (e) {
            toast.error('Either Password does not match or Validation error : Password must be 8+ characters, with at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.')
        } finally {
            toast.dismiss(toastId);
        }
    }

    return (<div className="flex justify-center">
        <div className='flex justify-center mt-6 flex-col gap-2 items-center shadow-sm bg-[#EEEEEE] p-2 w-64 rounded-md pb-5 pt-5'>
            <div className='font-bold text-xl text-[#333333]'>
                Change your password
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <input placeholder='Current Password' className='p-2 w-52 outline-none focus:border-2 focus:border-sky-600' onChange={(e) => setCurrPassword(e.target.value)}></input>
                <input placeholder='New Password' className='p-2 w-52 outline-none focus:border-2 focus:border-sky-600' onChange={(e) => setNewPassword(e.target.value)}></input>
                <button className="bg-[#5AC5A6] text-white p-1 rounded-md w-20" onClick={changePassword}>Update</button>
            </div>
        </div>
    </div>)
}
export default RightSidePassword;