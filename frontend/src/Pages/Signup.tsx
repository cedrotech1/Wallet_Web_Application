import { Link, useNavigate } from "react-router-dom"
import instance from "../API"
import { useState } from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";

interface signupData {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    comfirmpassword: string;
}

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<signupData>({ mode: 'onBlur' })
    const loginUser = async (data: signupData) => {
        setLoading(true);
        await instance
            .post('/users/signup', { ...data })
            .then((res) => {
                toast.success(res.data.message);
                navigate('/auth/')
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            })
            .finally(() => {
                setLoading(false);
                reset()
            });
    }
    return (
        <div className='h-full flex  flex-col justify-center '>
            <div className='w-4/5 mx-auto my-auto'>
                <div className='my-4'>
                    <p className="font-bold text-4xl text-center py-4">Sign up, Start Saving !!!</p>
                    <p className='py-3 text-gray-600  text-lg text-center'>Fill in the details to create an account</p>
                </div>

                <form onSubmit={handleSubmit(loginUser)}>
                    <div>
                        <label>First name</label>
                        <input {...register('firstname')} type='text' className='input' />
                    </div>
                    <div>
                        <label>Last name</label>
                        <input {...register('lastname')} type='text' className='input' />
                    </div>
                    <div>
                        <label>Telephone</label>
                        <input {...register('phone')} type='text' className='input' />
                    </div>
                    <div>
                        <label>Email</label>
                        <input {...register('email')} type='email' className='input' />
                    </div>
                    <div>
                        <label>Password</label>
                        <input {...register('password')} type='password' className='input' />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input {...register('comfirmpassword')} type='password' className='input' />
                    </div>
                    <button type='submit' className='w-full  mt-3 h-10 bg-black text-white rounded-[8px]'>
                        {loading ? <HashLoader color='#FFF' loading={loading} size={15} /> : 'Sign up'}
                    </button>
                    <div className='mt-6'>
                        <p className='text-center'>Already have an account ?  <Link className='pl-2 text-sky-800 font-bold' to=''>Login</Link> </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
