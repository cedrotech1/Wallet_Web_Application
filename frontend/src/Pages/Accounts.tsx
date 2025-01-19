import { useEffect, useState } from 'react';
import { Modal } from './../Components/Modal';
import instance from '@/API';
import Table from '@/Components/Table';
import { tableColumn } from '@/commonTypes';
import { HashLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import AccountForm from '../Components/AccountForm';
import UpdateModel from '@/Components/UpdateModal';
import { createAccountI } from '@/shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { addFetchedAccounts } from '@/reduxSlices/accountsSlice';
import { getAccounts } from '@/store';

const columns: tableColumn[] = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Account type',
    key: 'accountType',
  },
  {
    title: 'Balance',
    key: 'balance',
  },
];
const initialAccountItem = {
  balance: 0,
  accountType: '',
  name: '',
};
function Accounts() {
  const accounts = useSelector(getAccounts)
  const [loading, setLoading] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const dispatch = useDispatch();
  const fetchAccounts = async () => {
    setLoading(true);
    await instance
      .get('/Account')
      .then((res) => {
        dispatch(
          addFetchedAccounts(
            res.data.data.map((el: any) => ({
              id: el.id,
              name: el.name,
              balance: el.balance,
              accountType: el.accountType,
            }))
          )
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [updatableItemId, setUpdatableItemId] = useState<number | undefined>();
  const [updatableItem, setUpdatableItem] =
    useState<createAccountI>(initialAccountItem);
  const updateAction = async (id: number) => {
    setUpdatableItemId(() => id);
    const updatableItem = accounts.find((el) => el.id == id);
    setUpdatableItem(() => ({
      balance: updatableItem?.balance ? updatableItem.balance : 0,
      accountType: updatableItem?.accountType ? updatableItem.accountType : '',
      name: updatableItem?.name ? updatableItem.name : '',
    }));
    setOpenUpdateModel(true);
  };
  const deleteAction = async (id: number) => {
    await instance
      .delete(`/Account/delete/${id}`)
      .then(() => {
        toast.success('Account deleted successfuly !!!');
        fetchAccounts();
      })
      .catch(() => {
        toast.error('Failed. Error deleting account!!!');
      });
    console.log(id);
  };
  useEffect(() => {
    fetchAccounts();
  }, []);
  return (
    <div>
      <div className="flex justify-between my-3">
        <p className="p-2 bg-zinc-200 ">
          {' '}
          Accounts{' '}
          <span className="p-3 font-bold">
            {loading ? '...' : accounts.length}
          </span>
        </p>
        <Modal
          openButtonText="Create account"
          modalTitle="CREATE ACCOUNT"
          modalSubTitle="Fill the form to create an account"
        >
          <AccountForm
            isUpdate={false}
            item={initialAccountItem}
            fetchAccounts={fetchAccounts}

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
          data={accounts}
          updateAction={updateAction}
          deleteAction={deleteAction}
        />
      )}
      <UpdateModel
        isOpen={openUpdateModel}
        setIsOpen={setOpenUpdateModel}
        title="UPDATE ACCOUNT"
        subTitle="Fill the form to update the account"
        item={updatableItem}
      >
        <AccountForm
          isUpdate={true}
          item={updatableItem}
          updateItemId={updatableItemId}
          fetchAccounts={fetchAccounts}
        />
      </UpdateModel>
    </div>
  );
}

export default Accounts;
