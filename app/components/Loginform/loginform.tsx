'use client';
import Link from 'next/link'
import Image from 'next/image'
import { ABeeZee } from "next/font/google";
import React from 'react'
import { useFormik } from 'formik';
import { loginSchema } from '../../utils/loginSchema'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';

const abeezee = ABeeZee({
  subsets: ["latin"],
  weight: "400",
});

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        dispatch(loginStart());

        console.log('Sending login request with:', {
          email: values.email,
          password: values.password
        });

        const res = await authService.login(values.email, values.password);

        console.log('Login successful:', res);
        
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('refresh_token', res.refresh || '');
          localStorage.setItem('name', res.userInfo.name);
          localStorage.setItem('email', res.userInfo.email);
          localStorage.setItem('user_id', res.userInfo.id.toString());
          
          // حفظ في Redux state
          dispatch(loginSuccess({
            token: res.token,
            refreshToken: res.refresh,
            userInfo: res.userInfo,
          }));
          
          router.push('/dashboard');
        } else {
          dispatch(loginFailure('No token received from server'));
        }
      } catch (err: unknown) {
        // Narrow unknown error using runtime checks to avoid `any`.
        console.error('Login error:', err);

        let errorMessage = 'Login failed. Please check your credentials and try again.';

        // Axios errors often have `response` or `request` properties.
        const maybeAxiosError = err as {
          response?: { data?: { message?: string; error?: string } };
          request?: unknown;
          message?: string;
        };

        if (maybeAxiosError.response) {
          errorMessage = maybeAxiosError.response.data?.message
            || maybeAxiosError.response.data?.error
            || maybeAxiosError.message
            || errorMessage;
        } else if (maybeAxiosError.request) {
          errorMessage = 'No response from server. Please check your connection.';
        } else if (maybeAxiosError.message) {
          errorMessage = maybeAxiosError.message;
        }

        dispatch(loginFailure(errorMessage));
      }
    }
  });

  const isFormValid = () => {
    const isFilled = formik.values.email.trim() !== '' && 
                    formik.values.password.trim() !== '';
    const hasErrors = Object.keys(formik.errors).length > 0;
    
    return isFilled && !hasErrors;
  }

  const isButtonDisabled = isLoading || !isFormValid();

  return (
    <div className='w-[554px] min-h-screen gap-20 flex flex-col items-center justify-center space-y-4'>
      <form onSubmit={formik.handleSubmit} className='lg:w-[381px] lg:h-[437px] w-[300px] max-w-sm flex flex-col lg:space-y-7 lg:mt-0 -mt-65'>
        <div className='text-center space-y-2'>
          <h1 className={`${abeezee.className} lg:text-[56px] text-[40px] text-[#1A1A1E]`}>Welcome back</h1>
          <p className={`${abeezee.className} lg:text-[18px] text-[14px] text-[#62626B] mb-3`}>
            Step into our shopping metaverse for an unforgettable shopping experience
          </p>
        </div>
        
        <div className='flex flex-col gap-[20px]'>
          <div>
            <div className={`py-[15.5px] px-5 flex flex-row bg-[#FFFFFF66] border border-1 rounded-[8px] gap-[12px] ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-white'
            }`}>
              <Image src='/sms.png' alt='email icon' width={24} height={24} />
              <input
                type="email"
                name="email"
                placeholder='Email'
                className='input focus:outline-none focus:ring-0 z-50 bg-transparent w-full'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <div className={`py-4 px-5 bg-[#FFFFFF66] flex flex-row border border-1 rounded-[8px] gap-[12px] ${
              formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-white'
            }`}>
              <Image src='/lock.png' alt='lock icon' width={24} height={24} />
              <input
                type="password"
                name="password"
                placeholder='Password'
                className='input focus:outline-none z-50 focus:ring-0 bg-transparent w-full'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`p-3 rounded-[8px] mt-5 z-50 font-medium ${
            isButtonDisabled 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-[#9414FF] text-white cursor-pointer hover:bg-[#7a0bd6] transition-colors'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Logging in...
            </span>
          ) : 'Login'}
        </button>

        <p className={`${abeezee.className} text-[14px] text-[#62626B] text-center mt-2.5`}>
          Do not have an account? <Link href="/auth/register" className="text-[#9414FF] hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  )
}