import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../API';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { login } from '@/reduxSlices/authSlice';

interface loginData {
  email: string;
  password: string;
}
function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<loginData>({ mode: 'onBlur' });
  const loginUser = async (data: loginData) => {
    setLoading(true);
    await instance
      .post('/auth/login', { ...data })
      .then((res) => {
        const user: any = res.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(login(user));
        localStorage.setItem('token', JSON.stringify(res.data.token));
        toast.success(res.data.message);
        navigate('/');
      })
      .catch((err: any) => {
        console.log('err', err);
        toast.error(err.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
  };
  return (
    <div className="h-full flex  flex-col justify-center ">
      <div className="w-4/5 mx-auto my-auto">
        <div className="my-4">
          <p className="font-bold text-4xl text-center py-4">Welcome Back !</p>
          <p className="py-3 text-gray-600  text-lg text-center">
            Fill in the details to login
          </p>
        </div>

        <form onSubmit={handleSubmit(loginUser)}>
          <div>
            <label>Email</label>
            <input {...register('email')} type="email" className="input" />
          </div>
          <div>
            <label>Password</label>
            <input
              {...register('password')}
              type="password"
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
              'Login'
            )}
          </button>
          <div className="mt-6">
            <Link to="forgot-password" className="my-3 block text-center">
              Forgot Password
            </Link>
            <p className="text-center">
              Don't have an account ?{' '}
              <Link className="pl-2 text-sky-800 font-bold" to="signup">
                Signup
              </Link>{' '}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
