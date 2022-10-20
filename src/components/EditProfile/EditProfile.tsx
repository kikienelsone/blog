import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { editProfile, getPosts } from '../../store/Requests';
import { editProfileSchema } from '../Schema';

import profile from './EditProfile.module.scss';
type Profile = {
  username: string;
  email: string;
  password: number;
  image: string;
};
export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const placeholder = useAppSelector((state) => state.dataSlice.users);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Profile>({ resolver: yupResolver(editProfileSchema) });

  const update = (data: any) => {
    dispatch(editProfile(data)).then(() => {
      dispatch(getPosts());
      navigate('/');
    });
  };
  const onSubmit: SubmitHandler<Profile> = (data) => {
    update(data);
  };

  return (
    <>
      <form className={profile.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={profile.title}>Edit Profile</h2>
        <label>
          <p className={profile.text}>Username</p>
          <input
            defaultValue={placeholder?.username}
            className={profile.usermane}
            {...register('username', { required: true })}
          />
        </label>
        {errors.username?.message}
        <label>
          <p className={profile.text}>Email address</p>
          <input className={profile.email} defaultValue={placeholder?.email} {...register('email')} />
        </label>
        {errors.email?.message}
        <label>
          <p className={profile.text}>New password</p>
          <input className={profile.password} {...register('password')} />
        </label>
        {errors.password?.message}

        <label>
          <p className={profile.text}>Avatar image (url)</p>
          <input className={profile.image} defaultValue="" {...register('image')} />
        </label>
        {errors.image?.message}

        <input className={profile.button} type="submit" value="Save" />
      </form>
    </>
  );
};
