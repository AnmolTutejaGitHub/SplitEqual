import { useContext } from "react";
import UserContext from "../Context/UserContext";

const Dashboard: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User is undefined rn");
    }
    const { user, setUser } = context;
    console.log(user);

    return (<div>
    </div>)
}
export default Dashboard;