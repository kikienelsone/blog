import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { registerNewUser } from '../../store/Requests';
import { createProfileSchema } from '../Schema';

import styles from './SignUpForm.module.scss';

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
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(createProfileSchema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    dispatch(registerNewUser(data)).then(() => {
      navigate('/signin');
    });
  };
  return (
    <>
      <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Create new account</h2>
        <label>
          <p className={styles.text}>Username</p>
          <input className={styles.username} defaultValue="" {...register('username')} />
        </label>
        {errors.username?.message}
        <label>
          <p className={styles.text}>Email address</p>
          <input className={styles.email} defaultValue="" {...register('email')} />
        </label>
        {errors.email?.message}
        <label>
          <p className={styles.text}>password</p>
          <input className={styles.password} defaultValue="" {...register('password')} />
        </label>
        {errors.password?.message}
        <label>
          <p className={styles.text}>repeat password</p>
          <input className={styles.repeat} defaultValue="" {...register('repeat')} />
        </label>

        {errors.password?.message}

        <input className={styles.button} type="submit" value="Create" />
        <span>
          Already have an account?
          <Link className={styles.link} to="/signin">
            Sign In
          </Link>
        </span>
      </form>
    </>
  );
};
