import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { ADD_LYRIC_TO_SONG } from "../mutations/AddLyricsToSong";

type Props = {
  id: string;
};

interface NewLyrics {
  content: string;
  songId: string;
}

export const LyricCreate: React.FC<Props> = ({ id }) => {
  const [lyrics, setLyrics] = useState("");
  const [addLyrics] = useMutation<any, NewLyrics>(ADD_LYRIC_TO_SONG);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLyrics(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLyrics({ variables: { content: lyrics, songId: id } });
    setLyrics("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Add A Lyric</label>
      <input onChange={handleChange} value={lyrics} name="lyrics" />
      <button type="submit">Add Lyric To Song</button>
    </form>
  );
};
