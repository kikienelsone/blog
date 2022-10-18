import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { deletePost, getPosts } from '../../store/Requests';

import btns from './EditButtons.module.scss';
export const EditButtons: React.FC = () => {
  const posts = useAppSelector((state) => state.dataSlice.post);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const remove = () => {
    dispatch(deletePost(posts.slug)).then(() => {
      dispatch(getPosts());
      navigate('/');
    });
  };

  return (
    <div className={btns.wrapper}>
      <button onClick={() => remove()} className={btns.delete}>
        Delete
      </button>
      <Link to={`/post/:${posts.slug}/edit`}>
        <button className={btns.edit}>Edit</button>
      </Link>
    </div>
  );
};
