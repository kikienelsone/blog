import React, { useEffect } from 'react';
import { Alert, Spin } from 'antd';
import 'antd/dist/antd.css';
import { Route, Routes } from 'react-router';

import { getPosts } from '../../store/Requests';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import PostList from '../PostsList/PostList';
import { Post } from '../Post/Post';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { EditProfile } from '../EditProfile/EditProfile';
import { CreatePost } from '../CreatePost/CreatePost';
import { EditPost } from '../EditPost/EditPost';
import { Header } from '../Header/Header';

import app from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const load = useAppSelector((state) => state.dataSlice.loading);

  const loadingPostList = load ? (
    <Spin tip="Loading...">
      <Alert message="Alert message title" description="Further details about the context of this alert." type="info" />
    </Spin>
  ) : (
    <PostList />
  );
  const loadingPost = load ? (
    <Spin tip="Loading...">
      <Alert message="Alert message title" description="Further details about the context of this alert." type="info" />
    </Spin>
  ) : (
    <Post />
  );
  return (
    <div className={app.app}>
      <Header />
      <Routes>
        <Route path="/" element={loadingPostList} />
        <Route path="/post/:slug" element={loadingPost} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/post/profile" element={<EditProfile />} />
        <Route path="/post/:slug/edit" element={<EditPost />} />
        <Route path="/signin/create" element={<CreatePost />} />
      </Routes>
    </div>
  );
};

export default App;
