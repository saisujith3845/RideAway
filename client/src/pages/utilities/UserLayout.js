import Header from './Header'
import Footer from './Footer'
import AdminHeader from '../admin/AdminHeader';
import { useContext } from 'react';
import { DataContext } from './DataContext';

const UserLayout=({children})=>{
    const {data}=useContext(DataContext);
    return (
        <div>
            <div>
             { data?.isAdmin?<AdminHeader/> :<Header /> }
            </div>
            <div>
                {children}
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default UserLayout





