import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'antd/lib/button';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getCurrentUser, getPosts } from '../../store/Requests';
import { removeAuth } from '../../store/DataSlice';

import img from './3099451_cat_face_kissing_icon.png';
import navBarProfile from './NavBarProfile.module.scss';

export const NavBarProfile: React.FC = () => {
  const user = useAppSelector((state) => state.dataSlice.users);
  const userName = localStorage.getItem('username');
  const image = localStorage.getItem('image');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const logOut = () => {
    dispatch(removeAuth());
    getPosts();
    navigate('/');
  };
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
        Hello {userName}
        <Link to="/post/profile">{<img className={navBarProfile.img} src={image ? image : img} alt="pic" />}</Link>
        <Button onClick={() => logOut()} className={navBarProfile.button}>
          Log Out
        </Button>
      </div>
    </div>
  );
};
