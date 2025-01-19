import instance from '@/API';
import { budgetI, createBudgetI } from '@/shared/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateBudget } from '@/reduxSlices/budgetSlice';

interface props {
  item?: budgetI;
  isUpdate: boolean;
}

function CreateBudget({ item, isUpdate, }: props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createBudgetI>({ mode: 'onBlur', defaultValues: { ...item } });
  const dispatch = useDispatch()
  const createBudget = async (data: createBudgetI) => {
    setLoading(true);
    await instance
      .post('/budgets/add', { limit: Number(data.limit) })
      .then(() => {
        toast.success('Success budget created !!!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(() => {
        toast.error('Failed Error creating budget');
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };
  const handleUpdateBudget = async (data: createBudgetI) => {
    setLoading(true);
    await instance
      .put(`/budgets/edit`, { limit: Number(data.limit) })
      .then((res) => {
        const { limit, currentSpending, id } = res.data.data
        dispatch(updateBudget({ id, limit, currentSpending }))
        toast.success('Success budget updated !!!');
        navigate('/');
      })
      .catch(() => {
        toast.error('Failed Error updating budget');
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  }
  const handleSubmitAction = (data: createBudgetI) => {
    if (isUpdate) {
      handleUpdateBudget(data)
    } else {
      createBudget(data)
    }
  }
  return (
    <div className="relative">
      {isUpdate ? null : (
        <div className="absolute">
          <Logo color="black" />
        </div>
      )}

      <div className={`${isUpdate ? ' w-full' : "w-[100vw] h-[100vh] flex justify-center items-center "}  `}>
        <form
          className={` ${!isUpdate ? " w-[80%] md:w-[30%] " : ' '}`}
          onSubmit={handleSubmit(handleSubmitAction)}
        >
          <p className={` text-lg font-bold ${isUpdate ? '' : " my-3 text-center "} uppercase`}>
            {isUpdate ? 'Update budget' : ' Create Budget '}
          </p>
          {!isUpdate && (
            <p className={`${!isUpdate ? 'text-center' : ''}`}>Fill the form to create a new budget.</p>
          )}
          <div>
            <label className="text-sm font-semibold">Budget Limit</label>
            <input {...register('limit')} type="text" className="input" />
          </div>
          <button
            type="submit"
            className="w-full  mt-3 h-10 bg-black text-white rounded-[8px]"
          >
            {loading ? (
              <HashLoader color="#FFF" loading={loading} size={15} />
            ) : (
              isUpdate ? 'Update' : 'Create'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBudget;
