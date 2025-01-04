import { useContext } from "react";
import UserContext from "../Context/UserContext";
import Header from "./Header";
import SideBar from "./SideBar";
import Dashboard from "./Dashborad";
import RightSide from "./RightSide";

const Home: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user, setUser } = context;
    console.log(user);

    return (<div>
        <Header />

        <div className="flex">
            <div className="w-[30%]">
                <SideBar />
            </div>
            <div className="w-[40%]">
                <Dashboard />
            </div>
            <div className="w-[30%]">
                <RightSide />
            </div>
        </div>

    </div>)
}
export default Home;