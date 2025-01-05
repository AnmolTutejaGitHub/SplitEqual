import { Routes, Route } from 'react-router-dom';
import GroupBalance from './GroupBalance';

const RightSide: React.FC = () => {
    return (<div>
        <Routes>
            <Route path="/group/:groupid" element={<GroupBalance />}></Route>
        </Routes>
    </div>)
}
export default RightSide;