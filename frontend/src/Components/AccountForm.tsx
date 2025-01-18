import instance from "../API"
import { useState } from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { createAccountI } from "@/shared/types";


interface props {
    addAccount: (data: any) => void;
    item: createAccountI;
    isUpdate: boolean;
    updateItemId?: number
}
const AccountForm = ({ addAccount, item, isUpdate, updateItemId }: props) => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<createAccountI>({ mode: 'onBlur', defaultValues: { ...item } })
    const createAccount = async (data: createAccountI) => {
        setLoading(true);
        await instance
            .post('/Account/Add', { ...data, balance: Number(data.balance) })
            .then((res) => {
                console.log('res', res);
                toast.success('Success account created !!!');
                addAccount(res.data)
                // navigate('/auth/')

            })
            .catch(() => {
                toast.error('Failed Error creating account');
            })
            .finally(() => {
                setLoading(false);
                reset()
            });
    }
    const updateAccount = async (data: createAccountI) => {
        setLoading(true)
        await instance.put(`/Account/update/${updateItemId}`, { ...data, balance: Number(data.balance) }).then(() => {
            toast.success('Success account updated successfuly')
        }).catch(() => {
            toast.error('Failed. Error updating account.')
        }).finally(() => {
            setLoading(false)
        })
    }
    const handleSubmitAction = (data: createAccountI) => {
        if (!isUpdate) {
            createAccount(data)
        } else {
            updateAccount(data)
        }
    }
    return (
        <form onSubmit={handleSubmit(handleSubmitAction)}>
            <div>
                <label className='text-sm'>Account name</label>
                <input {...register('name')} type='text' className='input' />
            </div>
            <div>
                <label className='text-sm'>Account Type</label>
                <input {...register('accountType')} type='text' className='input' />
            </div>
            <div>
                <label className='text-sm'>Initial Account balance</label>
                <input {...register('balance')} type='number' min='0' className='input' />
            </div>

            <button type='submit' className='w-full  mt-3 h-10 bg-black text-white rounded-[8px]'>
                {loading ? <HashLoader color='#FFF' loading={loading} size={15} /> : isUpdate ? 'Update' : 'Create'}
            </button>

        </form>
    )
}

export default AccountForm
