import { useLocation } from 'react-router-dom';
import TopNavDropdown from './TopNavDropdown';
import { PiWalletLight } from 'react-icons/pi';

const DashboardTop = () => {
    const { pathname } = useLocation();
    const paths = pathname.split('/');
    const tab: string = paths[2];
    return (
        <div className='w-full bg-black '>
            <div className='flex flex-row-reverse items-center justify-between px-6 py-3 text-black bg-white md:flex-row '>
                <p className='text-sm font-bold capitalize'>Dashboard</p>
                <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2 font-bold'>
                        <PiWalletLight />
                        <div className='font-bold'>
                            BUDGET
                        </div>
                        <p>Limit: 1200</p>
                        <p>Current spending: 1200</p>
                    </div>
                    <TopNavDropdown />
                </div>
            </div>
        </div>
    );
};

export default DashboardTop;
