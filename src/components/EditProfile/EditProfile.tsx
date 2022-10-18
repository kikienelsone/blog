import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { NavBarProfile } from '../NavBarProfile/NavBarProfile';
import { useAppDispatch } from '../../hooks/hooks';

import profile from './EditProfile.module.scss';
type Profile = {
  username: string;
  email: string;
  password: number;
  image: string;
};
export const EditProfile: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Profile>();
  const onSubmit: SubmitHandler<Profile> = (data) => console.log(data);
  console.log(watch('username'));

  return (
    <>
      {/*<NavBarProfile />*/}

      <form className={profile.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={profile.title}>Edit Profile</h2>
        <label>
          <p className={profile.text}>Username</p>
          <input className={profile.usermane} defaultValue="" {...register('username')} />
        </label>

        <label>
          <p className={profile.text}>Email address</p>
          <input className={profile.email} defaultValue="" {...register('email')} />
        </label>

        <label>
          <p className={profile.text}>New password</p>
          <input className={profile.password} defaultValue="" {...register('password', { required: true })} />
        </label>

        <label>
          <p className={profile.text}>Avatar image (url)</p>
          <input className={profile.image} defaultValue="" {...register('image', { required: true })} />
        </label>

        {errors.image && <span>Your password needs to be at least 6 characters.</span>}
        {errors.password && <span>Passwords must match</span>}

        <input className={profile.button} type="submit" value="Save" />
      </form>
    </>
  );
};
