import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactMarkdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { editPost, getPosts } from '../../store/Requests';
import { editPostSchema } from '../Schema';

import styles from './EditPost.module.scss';

type Post = {
  title: string;
  description: string;
  body: string;
};
export const EditPost: React.FC = () => {
  const posts = useAppSelector((state) => state.dataSlice.post);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState(posts);
  const [value, setValue] = useState('');

  const [tags, setTags] = useState(posts.tagList);

  // console.log('state.dataSlice.post', posts.tagList);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Post>({ resolver: yupResolver(editPostSchema) });

  const editCurrentPost = (data: any) => {
    dispatch(editPost({ postSlug: posts.slug, postData: data })).then(() => {
      dispatch(getPosts());
      navigate('/');
    });
  };

  const inputValue = (event: any) => {
    setValue(event.target.value);
  };

  const addTag = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTags([...tags, value]);
    setValue('');
  };

  const deleteTag = (tag: string) => {
    const a = tags.filter((item: string) => {
      return item !== tag;
    });
    return setTags(a);
  };
  const result =
    tags &&
    tags.map((item: string) => (
      <div key={Math.random() * 42}>
        <input className={styles.inputTag} value={item} disabled={true}></input>

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
    editCurrentPost(a);
  };
  return (
    <div>
      <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <section className={styles.content}>
          <h2 className={styles.title}>Edit article</h2>
          <label>
            <p className={styles.text}>Title</p>
            <input
              onClick={() => setInput('')}
              value={input.title}
              // defaultValue={posts?.title}
              className={styles.inputTitle}
              {...register('title')}
            />
          </label>
          {errors.title?.message}

          <label>
            <p className={styles.text}>Short description</p>
            <input
              onClick={() => setInput('')}
              value={input.description}
              className={styles.inputDescription}
              {...register('description')}
            />
          </label>
          {errors.description?.message}
          <label>
            <p className={styles.text}>Text</p>
            <textarea value={input.body} className={styles.inputText} {...register('body')} />
          </label>

          {errors.body?.message}
        </section>

        <section className={styles.tags}>
          <p className={styles.text}>Tags</p>
          <div>{result}</div>

          <input onInput={(event) => inputValue(event)} value={value} className={styles.inputTag} />

          <button
            onClick={(event) => {
              event.preventDefault();
            }}
            className={styles.buttonDelete}
          >
            Delete
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              addTag();
            }}
            className={styles.buttonAddTag}
          >
            Add tag
          </button>
        </section>
        <input className={styles.buttonSend} type="submit" value="Send" />
      </form>
    </div>
  );
};
