import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function OTPValidation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || '';

    const [enteredOTP, setEnteredOTP] = useState('');
    const [sentOTP, setSentOTP] = useState('');
    //const [error, setError] = useState('');
    const [otpSending, setSending] = useState(false);

    useEffect(() => {
        if (!email || email.trim() === '') navigate("/login");
    }, []);

    async function sendOTP() {
        const toastid = toast.loading("sending");
        try {
            setSending(true);
            const otp = generateOTP();
            setSentOTP(otp);

            await axios.post(`http://localhost:8080/otp`, { email, otp });
            toast.success("Check Your Inbox");
        } catch (e) {
            toast.error("Some Error Occurred");
        } finally {
            setSending(false);
            toast.dismiss(toastid);
        }
    }

    async function validateOTP() {
        if (enteredOTP === '') return;
        if (sentOTP === enteredOTP) {
            navigate("/home/notifications");
            //window.location.reload();
        } else {
            toast.error("Invalid OTP");
        }
    }

    function generateOTP() {
        let otp = '';
        for (let i = 0; i < 4; i++) {
            const digit = Math.floor(Math.random() * 10);
            otp += digit.toString();
        }
        return otp;
    }

    return (
        <div className="flex justify-center items-center">
            <div className="mt-[12%] w-[400px]">
                <div>
                    <form className='p-[2rem] rounded-[5px] flex gap-[1rem] flex-col'>
                        <div className='flex items-center gap-4 pl-2'> <p className='text-[35px] font-bold'>OTP Validation</p>
                            {/* <img src={Logo}></img> */}
                        </div>

                        <input
                            placeholder="Enter OTP"
                            value={enteredOTP}
                            onChange={(e) => setEnteredOTP(e.target.value)}
                            className='p-[0.6rem] outline-none w-full bg-inherit border-[1.7px] border-[#333639] focus:border-[#5BC4A6] placeholder:text-[#71767A]'
                        />
                        <button onClick={sendOTP} disabled={otpSending} className="p-2 bg-[#5BC4A6] rounded-sm text-white">Generate OTP</button>
                        <button onClick={validateOTP} className="p-2 bg-[#5BC4A6] rounded-sm text-white">Validate OTP</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default OTPValidation;