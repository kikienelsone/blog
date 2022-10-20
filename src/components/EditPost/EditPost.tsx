import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { editPost, getPosts } from '../../store/Requests';

import edit from './EditPost.module.scss';

type Post = {
  title: string;
  description: string;
  body: string;
  tags: [string];
};
export const EditPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const posts = useAppSelector((state) => state.dataSlice.post);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Post>();

  const editCurrentPost = (data: any) => {
    dispatch(editPost({ postSlug: posts.slug, postData: data })).then(() => {
      dispatch(getPosts());
      navigate('/');
    });
  };
  const onSubmit: SubmitHandler<Post> = (data) => {
    editCurrentPost(data);
  };
  return (
    <div>
      <form className={edit.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <section className={edit.content}>
          <h2 className={edit.title}>Edit article</h2>
          <label>
            <p className={edit.text}>Title</p>
            <input className={edit.inputTitle} defaultValue="" {...register('title', { required: true })} />
          </label>
          {errors.title?.message}

          <label>
            <p className={edit.text}>Short description</p>
            <input className={edit.inputDescription} defaultValue="" {...register('description')} />
          </label>
          {errors.description?.message}

          <label>
            <p className={edit.text}>Text</p>
            <textarea className={edit.inputText} defaultValue="" {...register('body')} />
          </label>
          {errors.body?.message}
        </section>

        <section className={edit.tags}>
          <div>
            <p className={edit.text}>Tags</p>
          </div>

          <div>
            <label>
              <input className={edit.inputTag} defaultValue="" {...register('tags')} />
              <button className={edit.buttonDelete}>Delete</button>
              <button className={edit.buttonAddTag}>Add tag</button>
            </label>
          </div>
        </section>
        <input className={edit.buttonSend} type="submit" value="Send" />
      </form>
    </div>
  );
};
