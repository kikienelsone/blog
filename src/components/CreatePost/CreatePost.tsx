import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch } from '../../hooks/hooks';
import { createNewPost, getPosts } from '../../store/Requests';
// eslint-disable-next-line import/namespace
import { createPostSchema } from '../Schema';

import create from './CreatePost.module.scss';

type Post = {
  title: string;
  description: string;
  body: string;
  tagList: [];
};

export const CreatePost: React.FC = () => {
  const tagsArr = [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Post>({ resolver: yupResolver(createPostSchema) });
  const createPost = (data: any) => {
    dispatch(createNewPost(data)).then(() => {
      dispatch(getPosts());
      navigate('/');
    });
  };
  const onSubmit: SubmitHandler<Post> = (data) => {
    createPost(data);
    console.log(data);
  };
  return (
    <div className={create.wrapper}>
      <form className={create.content} onSubmit={handleSubmit(onSubmit)}>
        <div className={create.contentDesc}>
          <h2 className={create.title}>Create new article</h2>
          <label>
            <p className={create.text}>Title</p>
            <input className={create.inputTitle} defaultValue="" {...register('title', { required: true })} />
          </label>
          {errors.title?.message}
          <label>
            <p className={create.text}>Short description</p>
            <input className={create.description} defaultValue="" {...register('description')} />
          </label>
          {errors.description?.message}
          <label>
            <p className={create.text}>Text</p>
            <textarea className={create.inputText} defaultValue="" {...register('body')} />
          </label>
          {errors.body?.message}
        </div>

        <div className={create.wrapperTags}>
          <p className={create.textTags}>Tags</p>
          <div>
            <input className={create.tags} defaultValue="" {...register('tagList')} />

            <button className={create.buttonDelete}>delete</button>
            <button className={create.buttonAddTag}>add tag</button>
          </div>
        </div>

        <input className={create.buttonSend} type="submit" value="Send" />
      </form>
    </div>
  );
};
