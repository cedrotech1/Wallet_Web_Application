import instance from '@/API';
import { addNewCategory, updateCategory } from '@/reduxSlices/categoriesSlice';
import { createCategoryI } from '@/shared/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { HashLoader } from 'react-spinners';

interface props {
  item: createCategoryI;
  isUpdate: boolean;
  updateItemId?: number;
}

const CategoryForm = ({ item, isUpdate, updateItemId }: props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createCategoryI>({ mode: 'onBlur', defaultValues: { ...item } });
  const createCategory = async (data: createCategoryI) => {
    setLoading(true);
    await instance
      .post('/category/add', { ...data })
      .then((res) => {
        console.log('res', res);
        toast.success('Success category created !!!');
        dispatch(addNewCategory(res.data.data));
        // navigate('/auth/')
      })
      .catch(() => {
        toast.error('Failed Error creating category');
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };
  const handleUpdateCategory = async (data: createCategoryI) => {
    setLoading(true);
    await instance
      .put(`/category/update/${updateItemId}`, { ...data })
      .then((res) => {
        toast.success('category updated');
        dispatch(updateCategory(res.data.data))
      })
      .catch(() => {
        toast.error('Failed... Error updating category');
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };
  const handleSubmitAction = (data: createCategoryI) => {
    if (isUpdate) {
      handleUpdateCategory(data);
    } else {
      createCategory(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitAction)}>
      <div>
        <label className="text-sm">Category name</label>
        <input {...register('name')} type="text" className="input" />
      </div>
      <div>
        <label className="text-sm">Description</label>
        <input {...register('description')} type="text" className="input" />
      </div>
      <button
        type="submit"
        className="w-full  mt-3 h-10 bg-black text-white rounded-[8px]"
      >
        {loading ? (
          <HashLoader color="#FFF" loading={loading} size={15} />
        ) : !isUpdate ? (
          'Create'
        ) : (
          'Update'
        )}
      </button>
    </form>
  );
};
export default CategoryForm;
