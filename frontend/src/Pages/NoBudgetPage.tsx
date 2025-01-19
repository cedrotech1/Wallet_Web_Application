import Logo from '@/Components/Logo';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function NoBudgetPage() {
  const navigate = useNavigate();
  const goToCreateBudget = () => {
    navigate('/create-budget');
  };
  return (
    <div>
      <div className="absolute">
        <Logo color="black" />
      </div>
      <div className="min-h-[100vh] min-w-[100vw] flex justify-center items-center ">
        <div>
          <p className="mb-6 text-lg text-center text-gray-500">
            To start. Click to set your budget.
          </p>
          <button
            onClick={goToCreateBudget}
            className="flex items-center justify-center gap-2 py-4 text-white bg-black w-96"
          >
            <IoAddCircleOutline />
            <p>Set a budget</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoBudgetPage;
