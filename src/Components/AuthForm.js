import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from './AuthActions';
import { closeModal } from './ModalSlice';
import Spinner from './Spinner'; // Import the Spinner component
import validatePassword from '../Utils/PasswordValidation';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isLoading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) dispatch(closeModal());
  }, [isAuthenticated, dispatch]);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .test('password', (value) => {
        const errorMessage = validatePassword(value);
        return errorMessage || true;
      })
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });
  
  const signupValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .test('password', (value) => {
        const errorMessage = validatePassword(value);
        return errorMessage || true;
      })
      .required('Password is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
  });
  

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>

        <Formik
          initialValues={
            isLogin
              ? { email: '', password: '' }
              : { name: '', email: '', password: '', phone: '' }
          }
          validationSchema={isLogin ? loginValidationSchema : signupValidationSchema}
          onSubmit={(values) => {
            if (!isLogin) dispatch(register(values));
            else dispatch(login(values));
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {isLogin ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <Field
                      name="name"
                      type="text"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <Field
                      name="phone"
                      type="text"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 flex items-center justify-center text-white py-2 rounded-lg hover:bg-blue-600 transition-colors relative"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : (isLogin ? 'Login' : 'Sign Up')}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => setIsLogin(false)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setIsLogin(true)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
