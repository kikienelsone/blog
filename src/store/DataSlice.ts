import { createSlice } from '@reduxjs/toolkit';

import { ArticlesDataInterfaces } from '../interfaces/ArticlesDataInterfaces';
import { UsersInterface } from '../interfaces/UsersInterface';

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
  // eslint-disable-next-line import/namespace
} from './Requests';

interface DataInterface {
  data: ArticlesDataInterfaces[];
  post: any;
  newPost: any;
  users: UsersInterface | null;
  loading: boolean;
  isAuth: boolean;
  logout: boolean;
  newUser: UsersInterface | null;
  modal: boolean;
}

const initialState: DataInterface = {
  data: [],
  post: [],
  newPost: [],
  users: null,
  loading: true,
  isAuth: false,
  logout: false,
  newUser: null,
  modal: false,
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
        state.newPost = action.payload;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.newPost = action.payload;
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
export const { setAuth, removeAuth, openWindow, closeWindow } = dataSlice.actions;
