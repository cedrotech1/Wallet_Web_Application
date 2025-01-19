import instance from '../API';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { HashLoader } from 'react-spinners';
import { createAccountI } from '@/shared/types';
import { useDispatch } from 'react-redux';
import { addNewAccount, updateAccount } from '@/reduxSlices/accountsSlice';

interface props {
  item: createAccountI;
  isUpdate: boolean;
  updateItemId?: number;
  fetchAccounts: () => Promise<void>
}
const AccountForm = ({ item, isUpdate, updateItemId }: props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createAccountI>({ mode: 'onBlur', defaultValues: { ...item } });
  const createAccount = async (data: createAccountI) => {
    setLoading(true);
    await instance
      .post('/Account/Add', { ...data, balance: Number(data.balance) })
      .then((res) => {
        toast.success('Success account created !!!');
        const { id, name, balance, accountType } = res.data.data
        dispatch(addNewAccount({ id, name, balance, accountType }))
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      })
      .catch(() => {
        toast.error('Failed Error creating account');
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };
  const handleUpdateAccount = async (data: createAccountI) => {
    setLoading(true);
    await instance
      .put(`/Account/update/${updateItemId}`, {
        ...data,
        balance: Number(data.balance),
      })
      .then((res) => {
        const { id, name, balance, accountType } = res.data.data
        dispatch(updateAccount({ id, name, balance, accountType }))
        toast.success('Success account updated successfuly');
      })
      .catch(() => {
        toast.error('Failed. Error updating account.');
      })
      .finally(() => {
        setLoading(false);
        reset()
      });
  };
  const handleSubmitAction = (data: createAccountI) => {
    if (!isUpdate) {
      createAccount(data);
    } else {
      handleUpdateAccount(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitAction)}>
      <div>
        <label className="text-sm">Account name</label>
        <input {...register('name')} type="text" className="input" />
      </div>
      <div>
        <label className="text-sm">Account Type</label>
        <select {...register('accountType')} className="input">
          <option value=""> select category</option>
          <option value="Cash"> Cash</option>
          <option value="Mobile Money"> Mobile Money</option>
          <option value="Bank"> Bank</option>
        </select>
      </div>
      <div>
        <label className="text-sm">Initial Account balance</label>
        <input
          {...register('balance')}
          type="number"
          min="0"
          className="input"
        />
      </div>

      <button
        type="submit"
        className="w-full  mt-3 h-10 bg-black text-white rounded-[8px]"
      >
        {loading ? (
          <HashLoader color="#FFF" loading={loading} size={15} />
        ) : isUpdate ? (
          'Update'
        ) : (
          'Create'
        )}
      </button>
    </form>
  );
};

export default AccountForm;
