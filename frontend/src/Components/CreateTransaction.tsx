import instance from '@/API';
import { addNewTransaction } from '@/reduxSlices/transactionsSlice';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { HashLoader } from 'react-spinners';


interface createTransactionI {
  description: string;
  amount: number;
  subcategoryId: number;
  categoryId: number;
  accountId: number;
  type: string;
}
function CreateTransaction() {
  const [loading, setLoading] = useState(false);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<createTransactionI>({ mode: 'onBlur' });
  const category = watch('categoryId') || '';

  const createTransaction = async (data: createTransactionI) => {
    setLoading(true);
    const { categoryId, ...submitData } = data;
    await instance
      .post('/transaction/add', { ...submitData })
      .then((res) => {
        dispatch(addNewTransaction(res.data.data))

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };
  const getAllSubCategories = async () => {
    setLoading(true);
    await instance
      .get('/subcategory')
      .then((res) => {
        setSubcategories(() =>
          res.data.data.map((el: any) => ({
            id: el.id,
            name: el.name,
            category: el.category.name,
            categoryId: el.category.id,
          }))
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getAllCategories = async () => {
    setLoading(true);
    await instance
      .get('/category')
      .then((res) => {
        setCategories(() => res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getAllAccounts = async () => {
    setLoading(true);
    await instance
      .get('/Account')
      .then((res) => {
        setAccounts(() => res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllCategories();
    getAllSubCategories();
    getAllAccounts();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(createTransaction)}>
        <div>
          <label>Title</label>
          <input {...register('description')} type="text" className="input" />
        </div>
        <div>
          <label className="text-sm">Type</label>
          <select {...register('type')} className="input">
            <option value=""> select type</option>
            <option value="Income"> Income</option>
            <option value="Expense"> Expense</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Category</label>
          <select {...register('categoryId')} className="input">
            <option value=""> select category</option>
            {categories &&
              categories.length !== 0 &&
              categories.map((el) => <option value={el.id}> {el.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm">Sub category</label>
          <select
            disabled={category == ''}
            {...register('subcategoryId')}
            className="input"
          >
            <option value=""> select category</option>
            {subcategories &&
              subcategories.length !== 0 &&
              subcategories
                .filter((el) => el.categoryId == category)
                .map((el) => <option value={el.id}>{el.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm">Account</label>
          <select {...register('accountId')} className="input">
            <option value=""> select category</option>
            {accounts &&
              accounts.length !== 0 &&
              accounts.map((el) => <option value={el.id}> {el.name}</option>)}
          </select>
        </div>
        <div>
          <label>Amount</label>
          <input
            {...register('amount')}
            min="0"
            step="0.001"
            type="number"
            className="input"
          />
        </div>
        <button
          type="submit"
          className="w-full  mt-3 h-10 bg-black text-white rounded-[8px]"
        >
          {loading ? (
            <HashLoader color="#FFF" loading={loading} size={15} />
          ) : (
            'Add transaction'
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateTransaction;
