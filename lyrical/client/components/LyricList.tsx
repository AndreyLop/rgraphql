import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { LIKE_LYRIC } from "../mutations/likeLyric";

import { Lyrics } from "../interfaces/song";

type Props = {
  lyrics: Lyrics[];
};

export const LyricList: React.FC<Props> = ({ lyrics }) => {
  const [likeLyric] = useMutation(LIKE_LYRIC);

  const handleClick = (id: string, likes: number) => {
    likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: ++likes
        }
      }
    });
  };

  return (
    <ul className="collection">
      {lyrics.map(({ id, content, likes }) => (
        <li className="collection-item" key={id}>
          {content}
          <div className="vote-box">
            <i
              onClick={handleClick.bind(null, id, likes)}
              className="material-icons"
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      ))}
    </ul>
  );
};
