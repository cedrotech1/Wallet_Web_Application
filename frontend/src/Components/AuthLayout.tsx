import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <div className="w-full h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 py-6 px-8 md:py-2 md:px-20 bg-black text-white">
          <div className="h-full flex items-center justify-center md:justify-start">
            <div>
              <p className="font-bold text-3xl sm:text-4xl pb-4">I-WALLET</p>
              <p className="pt-4 text-sm sm:text-base">
                Manage your finances, save for your future.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full rounded-t-[16px] md:rounded-[16px] bg-white">
          <Outlet />
        </div>
      </div>
      
    )
}

export default AuthLayout