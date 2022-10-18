import React from 'react';

import tagsStyle from './Tags.module.scss';
interface TagsInterface {
  tags: [string] | [null];
}
export const Tags: React.FC<TagsInterface> = ({ tags }) => {
  return (
    <div>
      {tags &&
        tags.map((item) => {
          return (
            <span className={tagsStyle.wrapper} key={Math.random()}>
              {item}
            </span>
          );
        })}
    </div>
  );
};
