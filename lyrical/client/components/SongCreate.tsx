import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { ADD_SONG } from "../mutations/addSong";

export const SongCreate = () => {
  const [title, setTitle] = useState("");
  const [addSong] = useMutation(ADD_SONG);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSong({ variables: { title } });
  };

  return (
    <div>
      <h3>Add New Song</h3>
      <form onSubmit={handleSumbit}>
        <label>Song Title</label>
        <input name="title" value={title} onChange={handleChange} />
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
};
