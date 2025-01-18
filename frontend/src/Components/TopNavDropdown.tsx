import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { IoIosArrowDown, IoIosLogOut } from 'react-icons/io';
import useMediaQuery from '../Hooks/useMediaQuerry';
import { useSelector } from 'react-redux';
import { getUser } from '@/store';
import { logout } from '@/reduxSlices/authSlice';

const TopNavDropdown = () => {
    const isSmallScreenSize = useMediaQuery('(max-width:786px)');
    const user = useSelector(getUser)
    const navigate = useNavigate()
    const [profileOn, setProfileOn] = useState(false);
    const handleLogoutUser = () => {
        navigate('/auth')
    };

    return (
        <div
            className={`relative cursor-pointer  `}
            onClick={() => { setProfileOn(!profileOn); }}
        >
            <div className='flex items-center justify-between w-full py-1  rounded-full md:px-4 '>
                <div className='flex items-center gap-3'>
                    <div
                        className={`flex items-center justify-center w-6 h-6 text-white rounded-full bg-sky-100 `}
                    >
                        <CiUser />
                    </div>
                    {!isSmallScreenSize && (
                        <div>
                            <p className='text-xs font-medium uppercase'>{user?.firstname + " " + user?.lastname}</p>
                        </div>
                    )}
                </div>
                {!isSmallScreenSize && (
                    <IoIosArrowDown
                        className={` transition-all duration-300 ease-in-out w-3 h-3 ${profileOn ? ' rotate-180' : ''
                            }`}
                    />
                )}
            </div>
            <div
                style={{ zIndex: 3000 }}
                className={`${profileOn ? 'absolute' : 'hidden'} ${isSmallScreenSize ? 'w-120' : 'w-full'} ${!isSmallScreenSize ? '-right-10' : ''} px-4 bg-white`}
            >
                <div onClick={handleLogoutUser} className='flex items-center gap-3 p-2 text-xs font-light '>
                    <IoIosLogOut />
                    <p className='cursor-pointer' onClick={() => logout()} >Logout</p>
                </div>
            </div>
        </div>
    );
};

export default TopNavDropdown;
