import { useContext, useEffect } from "react";
import UserContext from "../Context/UserContext";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

function Login() {
    const [EnteredUser, setEnteredUser] = useState('');
    const [EnteredEmail, setEnteredEmail] = useState('');
    const [EnteredPassword, setEnteredPassword] = useState('');
    const [error, setError] = useState('');

    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user, setUser } = context;

    const navigate = useNavigate();
    const [loginLoader, setLoginLoader] = useState(false);

    // useEffect(() => {
    //     if (user) navigate('/home');
    // }, [user])

    async function handleLogin() {
        try {
            setLoginLoader(true);
            const response = await axios.post(`http://localhost:8080/login`, {
                name: EnteredUser,
                email: EnteredEmail,
                password: EnteredPassword,
            });

            if (response.status === 200) {
                const token = response.data.token;
                const EnteredUser = response.data.user;
                localStorage.setItem('token', token);
                sessionStorage.setItem('user', EnteredUser);
                setUser(EnteredUser);
                navigate('/OTPValidation', { state: { email: EnteredEmail } });
            }
        } catch (error) {
            setError("Some error Occurred");
        } finally {
            setLoginLoader(false);
        }
    }


    return (
        <div className="flex justify-center items-center">
            <div className='mt-[12%] w-[400px]'>
                <form className='p-[2rem] rounded-[5px] flex gap-[1rem] flex-col' onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className='flex items-center gap-2 pl-2'> <p className='text-[35px] font-bold'>Sign in to <span className='text-[#5BC4A6] italic'>SplitEqual </span></p></div>
                    <input placeholder="Enter Username" onChange={(e) => { setEnteredUser(e.target.value) }} className='p-[0.6rem] outline-none w-full bg-inherit border-[1.7px] border-[#333639] focus:border-[#5BC4A6] placeholder:text-[#71767A]' required></input>
                    <input placeholder="Enter Email" onChange={(e) => { setEnteredEmail(e.target.value) }} className='p-[0.6rem] outline-none w-full bg-inherit border-[1.7px] border-[#333639] focus:border-[#5BC4A6] placeholder:text-[#71767A]' required></input>
                    <input placeholder="Enter Password" onChange={(e) => { setEnteredPassword(e.target.value) }} className='p-[0.6rem] outline-none w-full bg-inherit border-[1.7px] border-[#333639] focus:border-[#5BC4A6] placeholder:text-[#71767A]' required></input>
                    <div><Link to="/forgetpassword" className='text-[#5BC4A6]'>Forget Password?</Link></div>
                    <p>Don't have an Account ? <span><Link to="/signup" className='text-[#5BC4A6]'>Signup</Link></span></p>
                    <button type="submit" className={`p-2 bg-[#5BC4A6] rounded-sm text-white ${loginLoader ? 'pt-1 pb-1 cursor-not-allowed bg-sky-800' : ''}`}>{loginLoader ?
                        <ClipLoader
                            color={'#fff'}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /> : 'login'}</button>
                    {error && <p className='text-red-600'>*{error}</p>}
                </form>
            </div>
        </div>);
}
export default Login;