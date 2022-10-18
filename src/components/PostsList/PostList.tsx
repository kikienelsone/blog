import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Pagination } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Authors } from '../Authors/Authors';
import { Tags } from '../Tags/Tags';
import { getOnePosts, pagination } from '../../store/Requests';
import { NavBar } from '../NavBar/NavBar';
import { NavBarProfile } from '../NavBarProfile/NavBarProfile';

import list from './PostList.module.scss';
const PostList: React.FC = () => {
  const dispatch = useAppDispatch();
  const postList = useAppSelector((state) => state.dataSlice.data);
  return (
    <>
      <ul className={list.wrapper}>
        {postList.map((item) => {
          return (
            <li key={Math.random() * 36} className={list.items}>
              <div>
                <Link to={`/post/${item.slug}`}>
                  <span
                    // onClick={() => {
                    //   dispatch(getOnePosts(item.slug));
                    // }}
                    className={list.title}
                  >
                    {item.title}
                  </span>
                </Link>
                <span className={list.likes}>&#9825;</span>
                <span className={list.count}>{item.favoritesCount}</span>
                <Tags tags={item.tagList} />
                <p className={list.description}>{item.description}</p>
              </div>
              <Authors authors={item.author} time={item.createdAt} />
            </li>
          );
        })}
        <Pagination
          className={list.pagination}
          onChange={(page) => dispatch(pagination(page))}
          defaultCurrent={1}
          total={50}
        />
      </ul>
    </>
  );
};
export default PostList;
