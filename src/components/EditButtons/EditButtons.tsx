import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
// eslint-disable-next-line import/namespace
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { openWindow } from '../../store/DataSlice';

import btns from './EditButtons.module.scss';
export const EditButtons: React.FC = () => {
  const posts = useAppSelector((state) => state.dataSlice.post);
  const modal = useAppSelector((state) => state.dataSlice.modal);
  const dispatch = useAppDispatch();

  const isOpen = modal ? <ModalWindow /> : null;

  return (
    <div className={btns.wrapper}>
      <button onClick={() => dispatch(openWindow())} className={btns.delete}>
        Delete
      </button>
      {isOpen}

      <Link to={`/post/:${posts.slug}/edit`}>
        <button className={btns.edit}>Edit</button>
      </Link>
    </div>
  );
};
