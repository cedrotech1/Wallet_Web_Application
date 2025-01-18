import instance from '@/API';
import { createSubcategoryI } from '@/shared/types';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';

interface Props {
    addCreatedSubcategory: (data: any) => void;
    item: createSubcategoryI;
    isUpdate: boolean;
    updateItemId?: number
}

function SubCategoryForm({ addCreatedSubcategory, item, isUpdate, updateItemId }: Props) {
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([]);
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<createSubcategoryI>({ mode: 'onBlur', defaultValues: { name: item.name, categoryId: item.categoryId } })
    const categoryId = watch('categoryId') || "";
    const getAllCategories = async () => {
        setLoading(true)
        await instance.get('/category').then((res) => {
            setCategories(() => res.data.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    const createSubcategory = async (data: createSubcategoryI) => {
        setLoading(true);
        await instance
            .post('/subcategory/add', { ...data })
            .then((res) => {
                console.log('res', res);
                toast.success('Success subcategory created !!!');
                addCreatedSubcategory(res.data)
                // navigate('/auth/')
            })
            .catch(() => {
                toast.error('Failed Error creating subcategory');
            })
            .finally(() => {
                setLoading(false);
                reset()
            });
    }
    const updateSubcategory = async (data: createSubcategoryI) => {
        setLoading(true)
        await instance.put(`/subcategory/update/${updateItemId}`, { ...data })
            .then(() => {
                toast.success('Sub category updated !!!')
            }).catch(() => {
                toast.error('Failed... Error updating sub category')
            }).finally(() => {
                setLoading(false)
            })
    }
    const handleSubmitAction = (data: createSubcategoryI) => {
        if (isUpdate) {
            updateSubcategory(data)
        } else {
            createSubcategory(data)
        }
    }

    console.log('updatable-item', item);

    useEffect(() => {
        getAllCategories()
    }, [])
    return (
        <form onSubmit={handleSubmit(handleSubmitAction)}>
            <div>
                <label className='text-sm'>Name</label>
                <input {...register('name')} type='text' className='input' />
            </div>
            {/* <div>
                <label className='text-sm'>Category</label>
                <select {...register('categoryId')} className='input' >
                    <option value=''> select category</option>
                    {categories && categories.length !== 0 && categories.map((el) => (
                        <option value={el.id} defaultValue={item.categoryId !== 0 ? categories.find((el) => el.id == item.categoryId).id : ''}> {el.name}</option>
                    ))}
                </select>
            </div> */}
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

            <button type='submit' disabled={categoryId === ''} className='w-full  mt-3 h-10 bg-black text-white rounded-[8px]'>
                {loading ? <HashLoader color='#FFF' loading={loading} size={15} /> : isUpdate ? "Update" : 'Create'}
            </button>
        </form>
    )
}

export default SubCategoryForm