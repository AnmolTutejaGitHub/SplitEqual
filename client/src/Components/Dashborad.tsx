import { useContext } from "react";
import UserContext from "../Context/UserContext";

const Dashboard: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("Dashboard must be used within a UserContext.Provider");
    }
    const { user, setUser } = context;
    console.log(user);

    return (<div>
    </div>)
}
export default Dashboard;