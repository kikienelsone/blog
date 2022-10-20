import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { closeWindow } from '../../store/DataSlice';
import { deletePost, getPosts } from '../../store/Requests';
import { useAppSelector } from '../../hooks/hooks';

import styles from './ModalWindow.module.scss';

export const ModalWindow: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useAppSelector((state) => state.dataSlice.post);
  const navigate = useNavigate();

  const remove = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(deletePost(posts.slug))
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(getPosts());
        navigate('/');
      })
      .then(() => {
        dispatch(closeWindow());
      });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <span className={styles.omg}>😱</span>
        <span className={styles.text}>Are you sure to delete this article?</span>
      </div>

      <div className={styles.btnsWrapper}>
        <button onClick={() => dispatch(closeWindow())} className={styles.buttonNo}>
          No
        </button>
        <button onClick={() => remove()} className={styles.buttonYes}>
          Yes
        </button>
      </div>
    </div>
  );
};
