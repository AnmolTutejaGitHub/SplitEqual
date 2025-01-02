import FooterImg from '../assets/FooterImg.png';
const Footer: React.FC = () => {
    const splitwise: string[] = ["About", "Press", "Blog", "Jobs", "Calculators"];
    const Account: string[] = ["Log in", "Sign up", "Reset Password", "Settings"];
    const More: string[] = ["Contact us", "FAQ", "Terms of service", "Privacy Policy"];

    function RenderList(list: string[]): JSX.Element[] {
        return (
            list.map((item) => {
                return (
                    <div>{item}</div>
                )
            })
        )
    }
    return (<div className="mt-20">
        <div className="flex gap-2 flex-wrap justify-evenly">
            <div className="flex gap-12 text-sm">
                <div>
                    <div className="font-bold text-[#54CCAE]">Splitwise</div>
                    <div>{RenderList(splitwise)}</div>
                </div>
                <div>
                    <div className="font-bold text-[#F6723F]">Account</div>
                    <div>{RenderList(Account)}</div>
                </div>
                <div>
                    <div className="font-bold text-[#373B3F]">More</div>
                    <div>{RenderList(More)}</div>
                </div>
            </div>
            <div className='text-sm'>Made with :) by <span className='font-bold italic text-[#F6723E]'><a href="https://x.com/Anmol_Tuteja_">Anmol Tuteja</a></span></div>
            <img src={FooterImg}></img>
        </div>
    </div>)
}
export default Footer;