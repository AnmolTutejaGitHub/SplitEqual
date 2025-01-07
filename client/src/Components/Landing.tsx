import Header from "./Header";
import ReviewImg from '../assets/b65f72d6d11a48c1bc560059cc36e31.png';
import ElephantPic from '../assets/Elephant.png';
import Facets from '../assets/facets.png';
import House from '../assets/landing-whereabout/171f69d7-cb36-4785-8b25-d2cd1c059d07.svg';
import Plane from '../assets/landing-whereabout/c0d5d515-5a77-4820-b801-41297f02627a.svg';
import Star from '../assets/landing-whereabout/91fb016e-cf5a-41e3-aa23-aabba5d06b94.svg';
import Heart from '../assets/landing-whereabout/8205b59f-70fe-4986-ab74-68cd170f4969.svg';
import Plane2 from '../assets/landing-whereabout/Plane 2.png';
import CoreFeature from '../assets/core-feature.svg';
import Footer from '../Components/Footer';
import { useNavigate } from "react-router-dom";

interface Review {
    pic?: string;
    content: string;
    by: string
}
const Landing: React.FC = () => {
    const navigate = useNavigate();
    const features: string[][] = [
        ["Add groups and friends", "Split expenses, record debts", "Equal or unequal splits", "Split by % or shares", "Calculate total balances", "Recurring expenses"],
        ["Spending totals", "Payment integrations", "Unlimited expenses", "Charts and graphs", "A totally ad-free experience"],
    ]

    const RenderFeatures: JSX.Element[] = features.map((ufeatures, groupIndex) => {
        return (
            <div className="space-y-4" key={groupIndex}>
                {ufeatures.map((feature, index) => (
                    <div className="flex gap-2 items-center" key={index}>
                        <img src={CoreFeature}></img>
                        {feature}
                    </div>
                ))}
            </div>
        );
    });

    const Reviews: Review[] = [
        { content: "“Fundamental” for tracking finances. As good as WhatsApp for containing awkwardness.", by: "Financial Times" },
        { content: "Life hack for group trips. Amazing tool to use when traveling with friends! Makes life so easy!!", by: "Ahah S, iOS" },
        { content: "Makes it easy to split everything from your dinner bill to rent.", by: "NY Times" },
        { content: "So amazing to have this app manage balances and help keep money out of relationships. love it!", by: "Haseena C, Android" },
        { content: "I never fight with roommates over bills because of this genius expense-splitting app", by: "Business Insider" },
        { content: "I use it everyday. I use it for trips, roommates, loans. I love splitEqual.", by: "Trickseyus, iOS" },
    ];

    const renderReviews: JSX.Element[] = Reviews.map((review, index) => {
        return (
            <div className="pt-6 pl-6 pr-6 pb-2 w-96 border border-gray-400 border-b-2 border-b-gray-600 shadow-sm rounded-md hover:border-b" key={index}>
                <div>{review.content}</div>
                <div className="flex gap-2 items-center pt-4">
                    <img src={`https://ui-avatars.com/api/?name=${review.by}`} className="rounded-sm"></img>
                    <div className="italic font-bold">{review.by}</div>
                </div>
            </div>
        )
    })

    return (<div>
        <Header />

        <div className="flex p-6 justify-around flex-wrap">
            <div className=" text-center flex flex-col items-center gap-2">
                <div className="text-[#373B3F] text-4xl font-extrabold leading-tight">
                    <div>Splitwise makes it</div>
                    <div>easy to get paid back.</div>
                </div>
                <img src={ElephantPic} className="w-56"></img>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-col gap-2 items-center w-72 text-center">
                    <img src={ReviewImg} className="w-20 rounded-full" ></img>
                    <p className="font-light">Join Anmol and NaN others who keep track of shared expenses and balances with housemates, trips, groups, friends, and family.</p>
                    <button className="text-md bg-[#F6723F] p-3 rounded-md text-white w-40 border-b-2 border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:border-b-0" onClick={() => navigate('/signup')}>Sign up</button>
                </div>
            </div>
        </div>

        <div className="bg-cover bg-center w-full p-6 flex justify-center items-center" style={{ backgroundImage: `url(${Facets})` }}>
            <div className="w-[50%] flex gap-2 flex-col justify-center items-center">
                <div className="text-[#373B3F] font-bold leading-tight text-4xl">Less stress when <br />sharing expenses <br /><span className="text-[#1AC29F]">with anyone.</span></div>
                <div className="flex gap-3">
                    <img src={House} className="w-10"></img>
                    <img src={Plane} className="w-10"></img>
                    <img src={Star} className="w-10"></img>
                    <img src={Heart} className="w-10"></img>
                </div>
                <p>Keep track of your shared expenses and <br />balances with housemates, trips, groups, <br />friends, and family.</p>
                <button className="text-md bg-[#1AC29F] p-3 rounded-md text-white w-40 border-b-2 border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:border-b-0" onClick={() => navigate('/signup')}>Sign up</button>
            </div>
            <div className="w-[50%]">
                <img src={Plane2} className="h-[400px]"></img>
            </div>
        </div>

        <div className="p-6">
            <div className="text-center font-bold text-[#373B3F] text-4xl pt-20 pb-14">The whole nine yards</div>
            <div className="flex justify-evenly">{RenderFeatures}</div>
            <div className="flex justify-center gap-2 items-center p-4">
                <img src={CoreFeature}></img>
                <div className="font-semibold">Core Features</div>
            </div>
        </div>

        <div className="flex flex-wrap justify-evenly gap-4">{renderReviews}</div>

        <Footer />
    </div >)
}
export default Landing;