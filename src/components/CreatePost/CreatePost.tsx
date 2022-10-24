import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { createNewPost, getPosts } from '../../store/Requests';
// eslint-disable-next-line import/namespace
import { createPostSchema } from '../Schema';
import { Tags } from '../Tags/Tags';

import styles from './CreatePost.module.scss';

type Post = {
  title: string;
  description: string;
  body: string;
};

export const CreatePost: React.FC = () => {
  const posts = useAppSelector((state) => state.dataSlice.newPost);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState('');

  console.log('tags', tags);

  const inputValue = (event: any) => {
    setValue(event.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();
  const createPost = (data: any) => {
    dispatch(createNewPost(data)).then(() => {
      dispatch(getPosts());
      navigate('/');
    });
  };

  const addTag = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTags([...tags, value]);
    setValue('');
  };

  const deleteTag = (tag: string) => {
    tags.filter((item) => {
      return item !== tag;
    });
  };

  const result =
    tags &&
    tags.map((item: any) => (
      <div key={Math.random() * 42}>
        <input className={styles.tags} value={item} disabled={true}></input>

        <button
          onClick={(event) => {
            event.preventDefault();
            deleteTag(item);
          }}
          className={styles.buttonDelete}
        >
          delete
        </button>
      </div>
    ));

  const onSubmit: SubmitHandler<Post> = (data) => {
    const a = {
      ...data,
      tagList: tags,
    };
    createPost(a);
    console.log('data', data);
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.contentDesc}>
          <h2 className={styles.title}>Create new article</h2>
          <label>
            <p className={styles.text}>Title</p>
            <input className={styles.inputTitle} defaultValue="" {...register('title')} />
          </label>
          {/*{errors.title?.message}*/}
          <label>
            <p className={styles.text}>Short description</p>
            <input className={styles.description} defaultValue="" {...register('description')} />
          </label>
          {/*{errors.description?.message}*/}
          <label>
            <p className={styles.text}>Text</p>
            <textarea className={styles.inputText} defaultValue="" {...register('body')} />
          </label>
          {/*{errors.body?.message}*/}
        </div>

        <div className={styles.wrapperTags}>
          <p className={styles.textTags}>Tags</p>

          <div>
            <div>{result}</div>
            <input value={value} onInput={(event) => inputValue(event)} className={styles.tags} />
            <button className={styles.buttonDelete}>delete</button>

            <button
              onClick={(event) => {
                event.preventDefault();
                addTag();
              }}
              className={styles.buttonAddTag}
            >
              Add tag
            </button>
          </div>
        </div>

        <input className={styles.buttonSend} type="submit" value="Send" />
      </form>
    </div>
  );
};
