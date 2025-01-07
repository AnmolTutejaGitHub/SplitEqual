import { Routes, Route } from 'react-router-dom';
import GroupBalance from './GroupBalance';
import RightSidePassword from './RightSidePassword';

const RightSide: React.FC = () => {
    return (<div>
        <Routes>
            <Route path="/group/:groupid" element={<GroupBalance />}></Route>
            <Route path="/dashboard" element={<RightSidePassword />}></Route>
        </Routes>
    </div>)
}
export default RightSide;