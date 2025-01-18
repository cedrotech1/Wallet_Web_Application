import { Navigate, Outlet } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import DashboardTop from './DashboardTop';
import { useDispatch, useSelector } from 'react-redux';
import { getBudget, getUser } from '@/store';
import { useEffect, useState } from 'react';
import instance from '@/API';
// import toast from 'react-hot-toast';
// import NoBudgetPage from '@/Pages/NoBudgetPage';

const LogedInLayout = () => {
    const user = useSelector(getUser)
    // const isBugdet = true
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const budget = useSelector(getBudget)
    const getUserBudget = async () => {
        setLoading(true)
        await instance.get('/budgets').then((res) => {
            console.log('res-budget', res.data.data);
            dispatch(res.data.data)
            // setBudget(res.data.data)
            console.log('budget', budget);

        }).catch(() => {
            // toast.error('Failed. Error getting user budget')
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        getUserBudget()
    }, [])

    if (!user) return <Navigate to="/auth/login" replace />;
    if (user && budget === undefined) return <div>Loading...</div>;
    if (user && !budget) return <Navigate to="/create-budget" replace />;
    if (user && budget) return <div className='flex overflow-x-hidden bg-primary-backg'>
        <div className={`w-[20vw] bg-black 'fixed z-20'}`}>
            <SidebarNav />
        </div>
        <div className={`w-[80vw] flex-1 bg-neutral-100`}>
            <div className={`w-full  py-1 min-h-[90vh]`}>
                <div style={{ zIndex: 10 }} className='sticky top-0 w-full mb-3 '>
                    <DashboardTop />
                </div>
                <div className='px-2 md:px-8'>
                    <Outlet />
                </div>
            </div>
        </div>
    </div>

};

export default LogedInLayout;
