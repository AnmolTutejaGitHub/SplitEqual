import Logo from '../assets/Splitwise_logo.png';
const Header: React.FC = () => {
    return (<div className='p-5 flex flex-wrap justify-between pl-[8vw] pr-[8vw]'>
        <div className='w-32'>
            < img src={Logo} ></img >
        </div >

        <div className='flex gap-2 text-sm'>
            <div className='text-[#1AC29F] p-3 font-semibold'>Log in</div>
            <div className='bg-[#1AC29F] p-3 text-white font-semibold rounded-md cursor-pointer border-b-2 border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:border-b-0'>Sign up</div>
        </div>
    </div >)
}
export default Header;
