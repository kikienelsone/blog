import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Tags } from '../Tags/Tags';
import { Authors } from '../Authors/Authors';
import { EditButtons } from '../EditButtons/EditButtons';
import { disLike, getOnePosts, getPosts, setLikes } from '../../store/Requests';
import styles from '../PostsList/PostList.module.scss';

import postStyle from './Post.module.scss';

export const Post: React.FC = () => {
  const { slug } = useParams();
  const post = useAppSelector((state) => state.dataSlice.post);
  const isAuth = useAppSelector((state) => state.dataSlice.isAuth);
  const user = useAppSelector((state) => state.dataSlice.users);
  const username = localStorage.getItem('username');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOnePosts(slug as string));
  }, [slug]);

  const like = () => {
    console.log(post);
    if (!post.favorited) {
      dispatch(setLikes(post.slug)).then(() => {
        dispatch(getOnePosts(post.slug));
      });
    } else {
      dispatch(disLike(post.slug)).then(() => {
        dispatch(getOnePosts(post.slug));
      });
    }
  };
  return (
    <>
      <div className={postStyle.wrapper}>
        <li className={postStyle.items}>
          <div className={postStyle.content}>
            <span className={postStyle.title}>{post.title}</span>
            <span onClick={() => like()} className={postStyle.likes}>
              {post.favorited ? <span className={styles.likes}>♥</span> : <span>♡</span>}
            </span>
            <span className={postStyle.count}>{post.favoritesCount}</span>
            <Tags tags={post.tagList} />
            {/* eslint-disable-next-line react/no-children-prop */}
            <ReactMarkdown children={post.body} />
            {/*<p className={postStyle.description}>{post.body}</p>*/}
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
