import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Pagination } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Authors } from '../Authors/Authors';
import { Tags } from '../Tags/Tags';
// eslint-disable-next-line import/namespace
import { disLike, getPosts, pagination, setLikes } from '../../store/Requests';
import { ArticlesDataInterfaces } from '../../interfaces/ArticlesDataInterfaces';

import styles from './PostList.module.scss';
const PostList: React.FC = () => {
  const dispatch = useAppDispatch();
  const postList = useAppSelector((state) => state.dataSlice.data);

  const like = (item: ArticlesDataInterfaces) => {
    console.log(item);
    if (!item.favorited) {
      dispatch(setLikes(item.slug)).then(() => {
        dispatch(getPosts());
      });
    } else {
      dispatch(disLike(item.slug)).then(() => {
        dispatch(getPosts());
      });
    }
  };

  return (
    <>
      <ul className={styles.wrapper}>
        {postList.map((item) => {
          return (
            <li key={Math.random() * 36} className={styles.items}>
              <div>
                <Link to={`/post/${item.slug}`}>
                  <span className={styles.title}>{item.title}</span>
                </Link>
                <span onClick={() => like(item)} className={styles.heart}>
                  {item.favorited ? <span className={styles.likes}>♥</span> : <span>♡</span>}
                </span>
                <span className={styles.count}>{item.favoritesCount}</span>
                <Tags tags={item.tagList} />
                <p className={styles.description}>{item.description}</p>
              </div>
              <Authors authors={item.author} time={item.createdAt} />
            </li>
          );
        })}
        <Pagination
          className={styles.pagination}
          onChange={(page) => dispatch(pagination(page))}
          defaultCurrent={1}
          total={50}
        />
      </ul>
    </>
  );
};
export default PostList;
