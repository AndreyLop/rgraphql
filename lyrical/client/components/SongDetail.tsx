import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

import { ID, SongData } from "../interfaces/song";
import { FETCH_SONG } from "../queries/fetchSong";

export const SongDetails = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery<SongData, ID>(FETCH_SONG, {
    variables: { id }
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const renderSong = () => {
    if (data && data.song.lyrics) {
      return (
        <ul>
          {data &&
            data.song.lyrics.map((lyric, i) => (
              <li key={i}>{lyric.content}</li>
            ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <h3>Song Detail</h3>
      {renderSong()}
    </div>
  );
};
