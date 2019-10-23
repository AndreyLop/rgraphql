import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_SONGS } from "../queries/fetchSongs";

interface Song {
  id?: string;
  title?: string;
  description?: string;
}

interface SongsData {
  songs: Song[];
}

export const SongList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<SongsData>(FETCH_SONGS);

  useEffect(() => {
    refetch();
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <ul className="collection">
      {data &&
        data.songs.map((song, i) => (
          <li className="collection-item" key={song.id}>
            {song.title}
          </li>
        ))}
    </ul>
  );
};
