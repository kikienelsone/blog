import React from 'react';
import { intlFormat } from 'date-fns';

import { AuthorInterface } from '../../interfaces/AuthorInterface';

import authorsStyles from './Authors.module.scss';

interface AuthorsItemInterface {
  authors: AuthorInterface;
  time: string;
}

export const Authors: React.FC<AuthorsItemInterface> = ({ time, authors }) => {
  const date = (day: string) => {
    if (day) {
      return intlFormat(
        new Date(day),
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
        {
          locale: 'en',
        },
      );
    } else return 'June 21, 1985';
  };
  return (
    <div className={authorsStyles.wrapper}>
      <span className={authorsStyles.name}>{authors.username}</span>
      <div>
        <img className={authorsStyles.img} src={authors.image} alt="img" />
      </div>
      <p className={authorsStyles.date}>{date(time)}</p>
    </div>
  );
};
