import instance from "@/API";
import { createBudgetI } from "@/shared/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

function CreateBudget() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<createBudgetI>({ mode: 'onBlur' })
    const createBudget = async (data: createBudgetI) => {
        setLoading(true);
        await instance
            .post('/budgets/add', { limit: Number(data.limit) })
            .then(() => {
                toast.success('Success budget created !!!');
                navigate('/')
            })
            .catch(() => {
                toast.error('Failed Error creating budget');
            })
            .finally(() => {
                setLoading(false);
                reset()
            });
    }
    return (
        <div className='relative'>
            <div className='absolute'>
                <Logo color='black' />
            </div>
            <div className='w-[100vw] h-[100vh] flex justify-center items-center '>
                <form className='w-[80%] md:w-[30%]' onSubmit={handleSubmit(createBudget)} >
                    <p className='my-3 text-lg font-bold text-center uppercase'>Create Budget</p>
                    <p className='text-center'>Fill the form to create a new budget.</p>
                    <div>
                        <label className='text-sm font-semibold'>Budget Limit</label>
                        <input {...register('limit')} type='text' className='input' />
                    </div>
                    <button type='submit' className='w-full  mt-3 h-10 bg-black text-white rounded-[8px]'>
                        {loading ? <HashLoader color='#FFF' loading={loading} size={15} /> : 'Create'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateBudget