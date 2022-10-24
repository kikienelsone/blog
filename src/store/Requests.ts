import { createAsyncThunk } from '@reduxjs/toolkit';

import { UsersInterface } from '../interfaces/UsersInterface';
import { NewPostInterface } from '../interfaces/NewPostInterface';

export const registerNewUser = createAsyncThunk('data/registerNewUser', async (user: UsersInterface) => {
  const { username, email, password } = user;
  console.log(user);
  try {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    });
    if (!response.ok) {
      throw new Error('smth');
    }
    const users = await response.json();
    localStorage.setItem('token', users.user.token);
    localStorage.setItem('username', users.user.username);
    return users.user;
  } catch (e) {
    return e;
  }
});

export const editPost = createAsyncThunk('post/editPost', async (slug: any) => {
  const { postSlug, postData } = slug;
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles/${postSlug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        article: postData,
      }),
    });
    if (!res.ok) {
      throw new Error('smth');
    }
    const users = await res.json();
    console.log(users);
  } catch (e) {
    console.log(e);
  }
});

export const editProfile = createAsyncThunk('post/editProfile', async (data: UsersInterface) => {
  const token = localStorage.getItem('token');
  const { username, email, password, image } = data;
  try {
    const res = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          image,
        },
      }),
    });
    if (!res.ok) {
      throw new Error('smth');
    }
    const users = await res.json();
    localStorage.setItem('username', users.user.username);
    localStorage.setItem('image', users.user.image);

    return users;
  } catch (e) {
    console.log(e);
  }
});

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('https://blog.kata.academy/api/user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const currentUser = await response.json();
    return currentUser.user;
  } catch (e) {
    console.log(e);
  }
});

export const loginNewUser = createAsyncThunk('data/loginNewUser', async (user: UsersInterface) => {
  const { email, password } = user;

  try {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    if (!response.ok) {
      throw new Error('smth');
    }
    const users = await response.json();
    console.log(users);
    localStorage.setItem('token', users.user.token);
    localStorage.setItem('username', users.user.username);
    return users;
  } catch (e) {
    console.log(e);
  }
});

export const setLikes = createAsyncThunk('post/setLikes', async (slug: string) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error('smth');
    }
    const like = await res.json();
    console.log(like);
  } catch (e) {
    console.log(e);
  }
});

export const disLike = createAsyncThunk('post/disLike', async (slug: string) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error('smth');
    }
    const like = await res.json();
    console.log(like);
  } catch (e) {
    console.log(e);
  }
});

export const createNewPost = createAsyncThunk('data/createNewPost', async (newPost: NewPostInterface) => {
  const { title, description, body, tagList } = newPost;
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList,
        },
      }),
    });
    if (!res.ok) {
      throw new Error('smth');
    }
    const posts = await res.json();
    console.log(posts);
    return posts;
  } catch (e) {
    console.log(e);
  }
});

export const deletePost = createAsyncThunk('data/deletePost', async (slug: string) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error('smth');
    }
    const posts = await res.json();
    console.log(posts);
  } catch (e) {
    console.log(e);
  }
});

export const getPosts = createAsyncThunk('data/getPosts', async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('https://blog.kata.academy/api/articles?limit=5&offset=0', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const posts = await res.json();
    return posts.articles;
  } catch (e) {
    console.log(e);
  }
});

export const getOnePosts = createAsyncThunk('data/getOnePosts', async (slug: string) => {
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const posts = await res.json();
    return posts.article;
  } catch (e) {
    console.log(e);
  }
});

export const pagination = createAsyncThunk('data/pagination', async (page: number) => {
  try {
    const res = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${page}`);
    const posts = await res.json();
    return posts.articles;
  } catch (e) {
    console.log(e);
  }
});
