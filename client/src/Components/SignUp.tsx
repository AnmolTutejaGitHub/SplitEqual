import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Logo from '../assets/Logo-removebg-preview.png';

function Signup() {
    const [EnteredUser, setEnteredUser] = useState('');
    const [EnteredEmail, setEnteredEmail] = useState('');
    const [EnteredPassword, setEnteredPassword] = useState('');
    const navigate = useNavigate();

    async function SignUp() {
        const toastid = toast.loading('singing up');
        try {
            const response = await axios.post<{ token: string }>(`${import.meta.env.VITE_API_URL}/signups`, {
                email: EnteredEmail,
                password: EnteredPassword,
                name: EnteredUser
            });

            if (response.status === 200) {
                const token: string = response.data.token;
                localStorage.setItem('token', token);

                toast.success('success');

                setTimeout(() => {
                    navigate("/login");
                }, 2000);

            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.error || "Some error Occurred");
            } else {
                toast.error("Some error Occurred");
            }
        } finally {
            toast.dismiss(toastid);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className='mt-20 w-[400px]'>
                <form className='p-[2rem] rounded-[5px] flex gap-[1rem] flex-col' onSubmit={(e) => { e.preventDefault(); SignUp(); }}>
                    <div className='flex justify-center'>
                        <img src={Logo} className='w-44'></img>
                    </div>
                    <div className='flex items-center gap-2 pl-2'> <p className='text-[30px] font-bold '>Create Your Account </p></div>
                    <input placeholder="Enter Username" onChange={(e) => { setEnteredUser(e.target.value) }} className='p-[0.6rem] outline-none w-full bg-inherit border-[1.7px] border-[#333639] focus:border-[#5BC4A6] placeholder:text-[#71767A]' required></input>
                    <input placeholder="Enter Email" onChange={(e) => { setEnteredEmail(e.target.value) }} className='p-[0.6rem] outline-none w-full bg-inherit border-[1.7px] border-[#333639] focus:border-[#5BC4A6] placeholder:text-[#71767A]' required></input>
                    <input placeholder="Set Password" onChange={(e) => { setEnteredPassword(e.target.value) }} className='p-[0.6rem] outline-none w-full bg-inherit border-[1.7px] border-[#333639] focus:border-[#5BC4A6] placeholder:text-[#71767A]' required></input>
                    <p>Already have an Account ? <span><Link to="/login" className='text-[#5BC4A6]'>Login</Link></span></p>
                    <button className='bg-[#5BC4A6] rounded-sm p-2 text-white' type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;