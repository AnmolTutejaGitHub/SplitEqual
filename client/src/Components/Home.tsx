import { useContext, useEffect } from "react";
import UserContext from "../Context/UserContext";
import Header from "./Header";
import SideBar from "./SideBar";
import Dashboard from "./Dashborad";
import RightSide from "./RightSide";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user } = context;
    console.log(user);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/');
    }, [])

    return (<div>
        <Header />

        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[30%]">
                <SideBar />
            </div>
            <div className="w-full md:w-[40%]">
                <Dashboard />
            </div>
            <div className="w-full md:w-[30%]">
                <RightSide />
            </div>
        </div>

    </div>)
}
export default Home;