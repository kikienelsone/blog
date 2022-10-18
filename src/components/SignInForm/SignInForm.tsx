import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { NavBar } from '../NavBar/NavBar';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginNewUser } from '../../store/Requests';
import { NavBarProfile } from '../NavBarProfile/NavBarProfile';
import { setAuth } from '../../store/DataSlice';

import signin from './SignInForm.module.scss';

type Inputs = {
  email: string;
  password: number;
};
export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(loginNewUser(data));
    if (token) {
      dispatch(setAuth());
    }
  };
  return (
    <>
      <form className={signin.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={signin.title}>Sign In</h2>

        <label>
          <p className={signin.text}>Email address</p>
          <input className={signin.email} defaultValue="" {...register('email')} />
        </label>

        <label>
          <p className={signin.text}>password</p>
          <input className={signin.password} defaultValue="" {...register('password', { required: true })} />
        </label>
        {errors.email && <span>Can not be empty</span>}
        {errors.password && <span>Passwords must match</span>}
        {/*<Link to="/">*/}
        <input className={signin.button} type="submit" value="Login" />
        {/*</Link>*/}
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
