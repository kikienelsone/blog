import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { NavBar } from '../NavBar/NavBar';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { registerNewUser } from '../../store/Requests';

import signUp from './SignUpForm.module.scss';

type Inputs = {
  username: string;
  email: string;
  password: number | string;
  repeat: number | string;
};
export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.dataSlice.users);
  console.log(users);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    dispatch(registerNewUser(data)).then(() => {
      navigate('/signin');
    });
  };

  // console.log(watch('username')); // watch input value by passing the name of it
  return (
    <>
      <form className={signUp.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={signUp.title}>Create new account</h2>
        <label>
          <p className={signUp.text}>Username</p>
          <input className={signUp.username} defaultValue="" {...register('username')} />
        </label>
        {/*{errors.username?.message}*/}
        <label>
          <p className={signUp.text}>Email address</p>
          <input className={signUp.email} defaultValue="" {...register('email')} />
        </label>
        {/*{errors.email?.message}*/}
        <label>
          <p className={signUp.text}>password</p>
          <input className={signUp.password} defaultValue="" {...register('password', { required: true })} />
        </label>
        {/*{errors.password?.message}*/}
        <label>
          <p className={signUp.text}>repeat password</p>
          <input className={signUp.repeat} defaultValue="" {...register('repeat', { required: true })} />
        </label>

        {/*{errors.password?.message}*/}

        <input className={signUp.button} type="submit" value="Create" />
        <span>
          Already have an account?
          <Link className={signUp.link} to="/signin">
            Sign In
          </Link>
        </span>
      </form>
    </>
  );
};
