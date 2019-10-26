import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "react-router-dom";

import { LyricList } from "./LyricList";
import { LyricCreate } from "./LyricCreate";

import { ID, SongData } from "../interfaces/song";
import { FETCH_SONG } from "../queries/fetchSong";

interface Props {
  id: string;
}

export const SongDetails: React.FC<RouteComponentProps<Props>> = props => {
  const { id } = props.match.params;

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
      const { title, lyrics } = data.song;
      return (
        <>
          <h3>{title}</h3>
          <LyricList lyrics={lyrics} />
          <LyricCreate id={id} />
        </>
      );
    }
  };

  return <div>{renderSong()}</div>;
};
