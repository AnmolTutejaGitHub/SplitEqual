import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

type AxiosErrorType = {
    response?: {
        data?: {
            message?: string;
            error?: string;
        };
    };
};

function ForgetPassword() {
    const [enteredOTP, setEnteredOTP] = useState('');
    const [generatedotp, setgeneratedotp] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function generateOTP() {
        let otp = '';
        for (let i = 0; i < 4; i++) {
            const digit = Math.floor(Math.random() * 10);
            otp += digit.toString();
        }
        return otp;
    }

    async function sendOTP(e: React.FormEvent) {
        e.preventDefault();
        const newOTP = generateOTP();
        const toastid = toast.loading('sending');
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/otp`, { email, otp: newOTP });
            setgeneratedotp(newOTP);
            toast.success("Otp sent Successfully!");
        } catch (e) {
            toast.error("Error sending OTP ")
        } finally {
            toast.dismiss(toastid);
        }
    }

    async function reset(e: React.FormEvent) {
        e.preventDefault();
        const toastid = toast.loading("Resetting");

        if (!email.trim()) {
            toast.error('please Enter Email');
            toast.dismiss(toastid);
            return;
        }
        if (!generatedotp.trim()) {
            toast.error('OTP verification failed');
            toast.dismiss(toastid);
            return;
        }
        if (!enteredOTP.trim()) {
            toast.error('Please Enter the otp code');
            toast.dismiss(toastid);
            return;
        }
        if (!password.trim()) {
            toast.error('Password not provided');
            toast.dismiss(toastid);
            return
        }
        if (enteredOTP.trim() != generatedotp) {
            toast.error('OTP does not match');
            toast.dismiss(toastid);
            return
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/resetpassword`, {
                email,
                password
            });

            toast.success('Password reset successful');
            setPassword('');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error: any) {
            const axiosError = error as AxiosErrorType;
            if (axiosError.response?.data?.message) {
                toast.error(axiosError.response.data.message);
            } else if (axiosError.response?.data?.error) {
                toast.error(axiosError.response.data.error);
            } else {
                toast.error('Error resetting password');
            }
        } finally {
            toast.dismiss(toastid);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className='mt-[12%] w-[400px]'>
                <form className='p-[2rem] rounded-[5px] flex gap-[1rem] flex-col'>
                    <div className='flex justify-center'>
                    </div>
                    <div className='flex items-center gap-2 pl-2'> <p className='text-[30px] font-bold'>Reset Your Password</p></div>
                    <input placeholder="Enter Email" className='p-[0.6rem] outline-none w-full bg-inherit border-[1.7px] border-[#333639] focus:border-[#5BC4A6] placeholder:text-[#71767A]' onChange={(e) => setEmail(e.target.value)} required></input>
                    <button className='bg-[#5BC4A6] rounded-sm p-2 text-white' onClick={sendOTP}>Send OTP</button>
                    <input placeholder="Enter OTP" className='p-[0.6rem] outline-none w-full bg-inherit border-[1.7px] border-[#333639] focus:border-[#5BC4A6] placeholder:text-[#71767A]' onChange={(e) => setEnteredOTP(e.target.value)}></input>
                    <input placeholder="Enter New Password" className='p-[0.6rem] outline-none w-full bg-inherit border-[1.7px] border-[#333639] focus:border-[#5BC4A6] placeholder:text-[#71767A]' onChange={(e) => setPassword(e.target.value)} ></input>
                    <button type="submit" className='bg-[#5BC4A6] rounded-sm p-2 text-white' onClick={(e) => reset(e)}>Reset</button>
                </form>
            </div>
        </div>
    );
}
export default ForgetPassword;