import React from 'react';

import styles from './Tags.module.scss';
interface TagsInterface {
  tags: string[] | [];
}
export const Tags: React.FC<TagsInterface> = ({ tags }) => {
  return (
    <div>
      {tags &&
        tags.map((item) => {
          return (
            <span className={styles.wrapper} key={Math.random()}>
              {item}
            </span>
          );
        })}
    </div>
  );
};
