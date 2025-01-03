import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface UserContextType {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
interface ProviderProps {
    children: ReactNode;
}

function Provider({ children }: ProviderProps) {
    const [user, setUser] = useState<string>(() => {
        return sessionStorage.getItem('user') || 'Anmol';
    });

    const [loading, setloading] = useState<boolean>(true);

    async function decodeToken() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8080/verifytokenAndGetUsername`, {
                token: token
            });
            if (response.status === 200) setUser(response.data.user);
        } catch (e) {
            console.log(e)
        }
        setloading(false);
    }

    useEffect(() => {
        decodeToken();
    }, [])

    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', user);
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export { Provider };
export default UserContext;