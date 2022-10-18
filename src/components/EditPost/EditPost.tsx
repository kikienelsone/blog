import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { NavBarProfile } from '../NavBarProfile/NavBarProfile';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { editPost } from '../../store/Requests';

import edit from './EditPost.module.scss';

type Post = {
  title: string;
  description: string;
  body: string;
  tags: [string];
};
export const EditPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.dataSlice.post);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Post>();
  const onSubmit: SubmitHandler<Post> = (data) => {
    console.log(data);
    dispatch(editPost({ postSlug: posts.slug, postData: data }));
  };
  return (
    <div>
      <form className={edit.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <section className={edit.content}>
          <h2 className={edit.title}>Edit article</h2>
          <label>
            <p className={edit.text}>Title</p>
            <input className={edit.inputTitle} defaultValue="" {...register('title')} />
          </label>

          <label>
            <p className={edit.text}>Short description</p>
            <input className={edit.inputDescription} defaultValue="" {...register('description')} />
          </label>

          <label>
            <p className={edit.text}>Text</p>
            <textarea className={edit.inputText} defaultValue="" {...register('body')} />
          </label>
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
