import { createSlice } from '@reduxjs/toolkit';
import { any } from 'prop-types';

import { ArticlesDataInterfaces } from '../interfaces/ArticlesDataInterfaces';

import {
  createNewPost,
  deletePost,
  editPost,
  editProfile,
  getCurrentUser,
  getOnePosts,
  getPosts,
  loginNewUser,
  pagination,
  registerNewUser,
} from './Requests';

export interface UsersInterface {
  username: string;
  email: string;
  // token: string;
  image?: string;
}

interface DataInterface {
  data: ArticlesDataInterfaces[];
  post: any;
  deletePost: any;
  newPost: any;
  editPost: any;
  users: UsersInterface | null;
  loading: boolean;
  isAuth: boolean;
  logout: boolean;
  newUser: any;
  likes: number;
  modal: boolean;
}

const initialState: DataInterface = {
  data: [],
  post: [],
  deletePost: [],
  editPost: [],
  newPost: [],
  users: null,
  loading: true,
  isAuth: false,
  logout: false,
  newUser: null,
  modal: false,
  likes: 0,
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setAuth(state) {
      state.isAuth = true;
    },
    removeAuth(state) {
      state.isAuth = false;
      localStorage.clear();
    },

    openWindow(state) {
      state.modal = true;
    },

    closeWindow(state) {
      state.modal = false;
    },

    like(state, action) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.likes = action + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getOnePosts.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
      })
      .addCase(pagination.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loginNewUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.newPost = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletePost = action.payload;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.editPost = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});
export default dataSlice.reducer;
export const { setAuth, removeAuth, like, openWindow, closeWindow } = dataSlice.actions;
