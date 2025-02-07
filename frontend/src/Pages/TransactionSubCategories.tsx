import instance from '@/API';
import { tableColumn } from '@/commonTypes';
import CreateSubCategory from '@/Components/SubCategoryForm';
import { Modal } from '@/Components/Modal';
import Table from '@/Components/Table';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';
import UpdateModel from '@/Components/UpdateModal';
import { createSubcategoryI } from '@/shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubCategories } from '@/store';
import { addFetchedsubcategories } from '@/reduxSlices/subcategoriesSlice';
const columns: tableColumn[] = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Category',
    key: 'category',
  },
];

const TransactionSubCategories = () => {
  // const [subcategories, setSubcategories] = useState<any[]>([]);
  const subcategories = useSelector(getAllSubCategories)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const fetchSubCategories = async () => {
    setLoading(true);
    await instance
      .get('/subcategory')
      .then((res) => {
        dispatch(addFetchedsubcategories(res.data.data.map((el: any) => ({
          id: el.id,
          name: el.name,
          category: el.category.name,
          categoryId: el.category.id,
        }))))

      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const [updatableItemId, setUpdatableItemId] = useState<number | undefined>();
  const [updatableItem, setUpdatableItem] = useState<createSubcategoryI>({
    name: '',
    categoryId: 0,
  });
  const updateAction = (id: number) => {
    setUpdatableItemId(() => id);
    const updatableItem = subcategories.find((el) => el.id == id);
    setUpdatableItem(() => ({
      name: updatableItem ? updatableItem.name : '',
      categoryId: updatableItem ? updatableItem.categoryId : 0,
    }));
    setOpenUpdateModel(true);
  };
  const deleteAction = async (id: number) => {
    await instance
      .delete(`/subcategory/delete/${id}`)
      .then(() => {
        toast.success('sub category deleted successfuly !!!');
        fetchSubCategories()
      })
      .catch(() => {
        toast.error('Failed. Error deleting sub category!!!');
      });
    console.log(id);
  };
  useEffect(() => {
    fetchSubCategories()
  }, []);
  return (
    <div>
      <div className="flex justify-between my-3">
        <p className="p-2 bg-zinc-200 ">
          {' '}
          Transaction sub-categories{' '}
          <span className="p-3 font-bold">
            {loading ? '...' : subcategories.length}
          </span>
        </p>
        <Modal
          openButtonText="Create subcategory"
          modalTitle="CREATE SUB-CATEGORY"
          modalSubTitle="Fill the form to create a sub category"
        >
          <CreateSubCategory
            isUpdate={false}
            item={{ name: '', categoryId: 0 }}
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
          data={subcategories}
          updateAction={updateAction}
          deleteAction={deleteAction}
        />
      )}
      <UpdateModel
        title="UPDATE SUB-CATEGORY"
        subTitle="Fill the form to update this sub-category"
        item={updatableItem}
        isOpen={openUpdateModel && updatableItemId !== undefined}
        setIsOpen={setOpenUpdateModel}
      >
        <CreateSubCategory
          isUpdate={true}
          item={updatableItem}
          updateItemId={updatableItemId}
        />
      </UpdateModel>
    </div>
  );
};

export default TransactionSubCategories;
