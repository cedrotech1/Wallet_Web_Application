import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <div className='w-[100vw] h-[100vh] flex'>
            <div className='w-1/2 py-2 px-20 bg-black text-white'>
                <div className='h-full flex items-center'>
                    <div>
                        <p className='font-bold text-4xl pb-4'>I-WALLET</p>
                        <p className='pt-4'>Manage your finances, save for your future.</p>
                    </div>
                </div>
            </div>
            <div className='w-1/2 rounded-[16px] h-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout