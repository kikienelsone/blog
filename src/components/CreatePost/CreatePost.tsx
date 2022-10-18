import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SubmitHandler, useForm } from 'react-hook-form';

import { NavBarProfile } from '../NavBarProfile/NavBarProfile';
import { useAppDispatch } from '../../hooks/hooks';
import { createNewPost } from '../../store/Requests';

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Post>();
  const onSubmit: SubmitHandler<Post> = (data) => {
    console.log(data);
    dispatch(createNewPost(data));
  };
  return (
    <div className={create.wrapper}>
      <form className={create.content} onSubmit={handleSubmit(onSubmit)}>
        <div className={create.contentDesc}>
          <h2 className={create.title}>Create new article</h2>
          <label>
            <p className={create.text}>Title</p>
            <input className={create.inputTitle} defaultValue="" {...register('title')} />
          </label>

          <label>
            <p className={create.text}>Short description</p>
            <input className={create.description} defaultValue="" {...register('description')} />
          </label>

          <label>
            <p className={create.text}>Text</p>
            <textarea className={create.inputText} defaultValue="" {...register('body')} />
          </label>
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
