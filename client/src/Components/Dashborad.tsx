import { useContext } from "react";
import UserContext from "../Context/UserContext";
import { Routes, Route } from "react-router-dom";
import GroupPage from "./GroupPage";
import Notification from "./Notification";
import DashBoard from "./DashBoard";
import Expense from './Expense';

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
            <Route path="/notifications" element={<Notification />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/expenses" element={<Expense />} />
        </Routes>
    </div>)
}
export default Dashboard;