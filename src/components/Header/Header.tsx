import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { NavBarProfile } from '../NavBarProfile/NavBarProfile';
import { NavBar } from '../NavBar/NavBar';
import { setAuth } from '../../store/DataSlice';

export const Header: React.FC = () => {
  const isAuth = useAppSelector((state) => state.dataSlice.isAuth);
  const token = localStorage.getItem('token');

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      dispatch(setAuth());
    }
  }, [token]);
  return <>{isAuth ? <NavBarProfile /> : <NavBar />}</>;
};
