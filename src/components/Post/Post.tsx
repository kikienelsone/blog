import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Tags } from '../Tags/Tags';
import { Authors } from '../Authors/Authors';
import { NavBar } from '../NavBar/NavBar';
import { NavBarProfile } from '../NavBarProfile/NavBarProfile';
import { EditButtons } from '../EditButtons/EditButtons';
import { getOnePosts } from '../../store/Requests';

import postStyle from './Post.module.scss';

export const Post: React.FC = () => {
  const { slug } = useParams();
  const post = useAppSelector((state) => state.dataSlice.post);
  const isAuth = useAppSelector((state) => state.dataSlice.isAuth);
  const user = useAppSelector((state) => state.dataSlice.users);
  const username = localStorage.getItem('username');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOnePosts(slug));
  }, [slug]);

  return (
    <>
      <div className={postStyle.wrapper}>
        <li className={postStyle.items}>
          <div className={postStyle.content}>
            <span className={postStyle.title}>{post.title}</span>
            <span className={postStyle.likes}>&#9825;</span>
            <span className={postStyle.count}>{post.favoritesCount}</span>
            <Tags tags={post.tagList} />
            <p className={postStyle.description}>{post.body}</p>
          </div>
          <div>
            {post.author && <Authors authors={post.author} time={post.createdAt} />}
            {post.author && post.author.username === username && isAuth ? <EditButtons /> : null}
          </div>
        </li>
      </div>
    </>
  );
};
