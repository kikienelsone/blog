import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getPosts, loginNewUser } from '../../store/Requests';
import { removeAuth, setAuth } from '../../store/DataSlice';

import signin from './SignInForm.module.scss';

type Inputs = {
  email: string;
  password: number;
};
export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const login = (data: any) => {
    dispatch(loginNewUser(data)).then(() => {
      if (token) {
        dispatch(setAuth());
      }
      dispatch(getPosts());
    });

    navigate('/');
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data);
  };
  return (
    <>
      <form className={signin.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={signin.title}>Sign In</h2>

        <label>
          <p className={signin.text}>Email address</p>
          <input className={signin.email} defaultValue="" {...register('email')} />
        </label>
        {/*{errors.email?.message}*/}

        <label>
          <p className={signin.text}>password</p>
          <input className={signin.password} defaultValue="" {...register('password', { required: true })} />
        </label>
        {/*{errors.password?.message}*/}
        <input className={signin.button} type="submit" value="Login" />
        <span>
          Don’t have an account?
          <Link className={signin.link} to="/signup">
            Sign Up
          </Link>
        </span>
      </form>
    </>
  );
};
