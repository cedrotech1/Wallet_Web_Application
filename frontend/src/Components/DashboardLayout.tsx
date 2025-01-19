import { Navigate, Outlet } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import DashboardTop from './DashboardTop';
import { useDispatch, useSelector } from 'react-redux';
import { getBudget, getUser } from '@/store';
import { useEffect, useState } from 'react';
import instance from '@/API';

const LogedInLayout = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const budget = useSelector(getBudget);

  const getUserBudget = async () => {
    setLoading(true);
    await instance
      .get('/budgets')
      .then((res) => {
        dispatch(res.data.data);
      })
      .catch(() => {
        console.error('Error fetching budget');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserBudget();
  }, []);

  if (!user) return <Navigate to="/auth" replace />;
  if (user && budget === undefined) return <div>Loading...</div>;
  if (user && !budget) return <Navigate to="/create-budget" replace />;
  if (user && budget) {
    return (
      <div className="flex bg-primary-backg">
        {/* Sidebar */}
        <div
          className={`fixed z-30 bg-black text-white transition-transform duration-300 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 w-64 h-screen`}
        >
          <SidebarNav />
        </div>
        {/* Overlay for Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        {/* Main Content */}
        <div className="flex-1 min-h-screen ml-0 md:ml-64">
          <DashboardTop onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
};

export default LogedInLayout;
