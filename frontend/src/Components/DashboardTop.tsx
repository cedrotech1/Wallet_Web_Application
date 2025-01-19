import TopNavDropdown from './TopNavDropdown';
import { PiWalletLight } from 'react-icons/pi';
import UpdateModel from './UpdateModal';
import CreateBudget from './CreateBudget';
import { useState } from 'react';
import { getBudget } from '@/store';
import { useSelector } from 'react-redux';
import { budgetI } from '@/shared/types';
import { FiMenu } from 'react-icons/fi';

interface DashboardTopProps {
  onToggleSidebar: () => void;
}

const DashboardTop: React.FC<DashboardTopProps> = ({ onToggleSidebar }) => {
  const { budget } = useSelector(getBudget);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  return (
    <div className="w-full bg-black">
      <div className="flex items-center justify-between px-6 py-3 text-black bg-white md:flex-row">
        <button
          className="text-black md:hidden flex items-center justify-center" // Ensure button is properly styled and visible
          onClick={onToggleSidebar}
        >
          <FiMenu size={24} />
        </button>
        <p className="text-sm font-bold capitalize hidden md:block">Dashboard</p> {/* Hide text on smaller screens */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-3 font-bold bg-neutral-100 rounded-[8px]">
            <PiWalletLight size={20} />
            <button onClick={handleOpenUpdate} className="text-sm font-bold">
              UPDATE BUDGET
            </button>
          </div>
          <TopNavDropdown />
        </div>
      </div>
      <UpdateModel
        isOpen={openUpdate}
        setIsOpen={setOpenUpdate}
        title="UPDATE CURRENT BUDGET"
        subTitle=""
        item={budget}
      >
        <div>
          <CreateBudget isUpdate={true} item={budget as budgetI} />
        </div>
      </UpdateModel>
    </div>
  );
};

export default DashboardTop;
