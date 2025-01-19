import instance from '@/API';
import {
  addNewSubcategory,
  updateSubcategory,
} from '@/reduxSlices/subcategoriesSlice';
import { createSubcategoryI } from '@/shared/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { HashLoader } from 'react-spinners';

interface Props {
  item: createSubcategoryI;
  isUpdate: boolean;
  updateItemId?: number;
}

function SubCategoryForm({ item, isUpdate, updateItemId }: Props) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<createSubcategoryI>({
    mode: 'onBlur',
    defaultValues: { name: item.name, categoryId: item.categoryId },
  });
  const categoryId = watch('categoryId') || '';
  const dispatch = useDispatch();
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
  const createSubcategory = async (data: createSubcategoryI) => {
    setLoading(true);
    await instance
      .post('/subcategory/add', { ...data })
      .then((res) => {
        dispatch(addNewSubcategory(res.data.data));
        toast.success('Success subcategory created !!!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);


      })
      .catch(() => {
        toast.error('Failed Error creating subcategory');
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };
  const handleUpdateSubcategory = async (data: createSubcategoryI) => {
    setLoading(true);
    await instance
      .put(`/subcategory/update/${updateItemId}`, { ...data })
      .then((res) => {
        dispatch(updateSubcategory(res.data.data));
        toast.success('Sub category updated !!!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      })
      .catch(() => {
        toast.error('Failed... Error updating sub category');
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };
  const handleSubmitAction = (data: createSubcategoryI) => {
    if (isUpdate) {
      handleUpdateSubcategory(data);
    } else {
      createSubcategory(data);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <form onSubmit={handleSubmit(handleSubmitAction)}>
      <div>
        <label className="text-sm">Name</label>
        <input {...register('name')} type="text" className="input" />
      </div>
      <div>
        <label className="text-sm">Category</label>
        <select
          {...register('categoryId')}
          className="input"
          value={categoryId}
        >
          <option value="">Select category</option>
          {categories &&
            categories.length > 0 &&
            categories.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={categoryId === ''}
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
}

export default SubCategoryForm;
