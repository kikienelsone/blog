import { createSlice } from '@reduxjs/toolkit';

import { ArticlesDataInterfaces } from '../interfaces/ArticlesDataInterfaces';

import {
  createNewPost,
  deletePost,
  editPost,
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
  token: string;
}

interface DataInterface {
  data: ArticlesDataInterfaces[];
  post: any;
  users: UsersInterface | null;
  loading: boolean;
  isAuth: boolean;
  logout: boolean;
  deletePosts: any;
  editPosts: any;
  newUser: any;
}

const initialState: DataInterface = {
  data: [],
  post: [],
  users: null,
  loading: true,
  isAuth: false,
  logout: false,
  deletePosts: [],
  editPosts: [],
  newUser: null,
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setAuth(state) {
      state.isAuth = true;
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
        state.post = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletePosts = action.payload;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.newUser = action.payload;
      });
  },
});
export default dataSlice.reducer;
export const { setAuth } = dataSlice.actions;
