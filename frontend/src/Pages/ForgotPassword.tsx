import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../API';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';

interface forgotPasswordData {
  email: string;
}
function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<forgotPasswordData>({ mode: 'onBlur' });
  const loginUser = async (data: forgotPasswordData) => {
    setLoading(true);
    await instance
      .post('/users/signup', { ...data })
      .then((res) => {
        toast.success(res.data.message);
        navigate('/auth/');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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
          <p className="font-bold text-4xl text-center py-4">FORGOT PASSWORD</p>
          <p className="py-3 text-gray-600  text-lg text-center">
            Submit your email
          </p>
        </div>
        <form onSubmit={handleSubmit(loginUser)}>
          <div>
            <label>Email</label>
            <input {...register('email')} type="email" className="input" />
          </div>

          <button
            type="submit"
            className="w-full  mt-3 h-10 bg-black text-white rounded-[8px]"
          >
            {loading ? (
              <HashLoader color="#FFF" loading={loading} size={15} />
            ) : (
              'Submit'
            )}
          </button>
          <div className="mt-6">
            <Link className="pl-2 text-sky-800 font-bold" to="/auth/">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
