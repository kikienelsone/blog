import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getCurrentUser } from '../../store/Requests';

import img from './3099451_cat_face_kissing_icon.png';
import navBarProfile from './NavBarProfile.module.scss';

export const NavBarProfile: React.FC = () => {
  const user = useAppSelector((state) => state.dataSlice.users);
  const username = localStorage.getItem('username');
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={navBarProfile.wrapper}>
        <Link to="/">
          <p className={navBarProfile.title}>Realworld Blog</p>
        </Link>
        <Link to="/signin/create">
          <Button className={navBarProfile.button} type="dashed">
            Create Article
          </Button>
        </Link>
        Hello {username}
        <Link to="/post/profile">
          {<img onClick={() => dispatch(getCurrentUser())} className={navBarProfile.img} src={img} alt="cat" />}
        </Link>
        <Button className={navBarProfile.button}>Log Out</Button>
      </div>
    </div>
  );
};
