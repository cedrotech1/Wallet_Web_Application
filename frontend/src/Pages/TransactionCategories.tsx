import instance from '@/API';
import { tableColumn } from '@/commonTypes';
import CategoryForm from '@/Components/CategoryForm';
import { Modal } from '@/Components/Modal';
import Table from '@/Components/Table';
import UpdateModel from '@/Components/UpdateModal';
import { addFetchedcategories } from '@/reduxSlices/categoriesSlice';
import { createCategoryI } from '@/shared/types';
import { getAllCategories } from '@/store';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';

const columns: tableColumn[] = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Description',
    key: 'description',
  },
];

function TransactionCategories() {
  const categories = useSelector(getAllCategories)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const fetchCategories = async () => {
    setLoading(true);
    await instance
      .get('/category')
      .then((res) => {
        dispatch(addFetchedcategories(res.data.data));
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [updatableItemId, setUpdatableItemId] = useState<number | undefined>();
  const [updatableItem, setUpdatableItem] = useState<createCategoryI>({
    name: '',
    description: '',
  });

  const updateAction = (id: number) => {
    setUpdatableItemId(() => id);
    const updatableItem = categories.find((el) => el.id == id);
    setUpdatableItem(() => ({
      name: updatableItem ? updatableItem.name : '',
      description: updatableItem ? updatableItem.description : '',
    }));
    setOpenUpdateModel(true);
  };
  const deleteAction = async (id: number) => {
    await instance
      .delete(`/category/delete/${id}`)
      .then(() => {
        toast.success('category deleted successfuly !!!');
        fetchCategories();
      })
      .catch(() => {
        toast.error('Failed. Error deleting account!!!');
      });
    console.log(id);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <div className="flex justify-between my-3">
        <p className="p-2 bg-zinc-200 ">
          {' '}
          Transaction categories{' '}
          <span className="p-3 font-bold">
            {loading ? '...' : categories.length}
          </span>
        </p>
        <Modal
          openButtonText="Create category"
          modalTitle="CREATE CATEGORY"
          modalSubTitle="Fill the form to create an category"
        >
          <CategoryForm
            isUpdate={false}
            item={{ name: '', description: '' }}

          />
        </Modal>
      </div>
      {loading ? (
        <div className="flex items-center justify-center w-full h-36">
          <HashLoader color="#000" loading={loading} size={15} />
        </div>
      ) : (
        <Table
          columns={columns}
          data={categories}
          updateAction={updateAction}
          deleteAction={deleteAction}
        />
      )}

      <UpdateModel
        title="UPDATE CATEGORY"
        subTitle="Fill the form to update this category"
        item={updatableItem}
        isOpen={openUpdateModel && updatableItemId !== undefined}
        setIsOpen={setOpenUpdateModel}
      >
        <CategoryForm
          updateItemId={updatableItemId}
          isUpdate={true}
          item={updatableItem}

        />
      </UpdateModel>
    </div>
  );
}

export default TransactionCategories;
