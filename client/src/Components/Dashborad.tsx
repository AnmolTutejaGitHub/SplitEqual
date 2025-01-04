import { useContext } from "react";
import UserContext from "../Context/UserContext";
import { Routes, Route } from "react-router-dom";
import GroupPage from "./GroupPage";

const Dashboard: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user, setUser } = context;
    console.log(user);

    return (<div>
        <Routes>
            <Route path="/group/:groupid" element={<GroupPage />} />
        </Routes>
    </div>)
}
export default Dashboard;