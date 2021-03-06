import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import { FETCH_SONGS } from "../queries/fetchSongs";
import { DELETE_SONG } from "../mutations/deleteSong";

import { ID, Song, SongsData } from "../interfaces/song";

export const SongList: React.FC = () => {
  const { loading, error, data } = useQuery<SongsData>(FETCH_SONGS);
  const [deleteSong] = useMutation<Song, ID>(DELETE_SONG, {
    // In order to update UI aftert this particluar mutation
    // you must update cache manually
    // cause apollo dont understands  that you deleted something
    update: (store, { data }) => {
      // read current cache
      const cache = store.readQuery<SongsData>({ query: FETCH_SONGS });
      if (cache && cache.songs) {
        // Filter out deleted song
        const songs = cache.songs.filter(
          (song: Song) => song.id !== data.deleteSong.id
        );
        // Put whats left inside cache
        store.writeQuery({ query: FETCH_SONGS, data: { songs } });
      }
    }
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <ul className="collection">
        {data &&
          data.songs.map(({ id, title }) => (
            <li className="collection-item" key={id}>
              <Link to={`songs/${id}`}>{title}</Link>
              <i
                className="material-icons"
                onClick={deleteSong.bind(null, { variables: { id } })}
              >
                delete
              </i>
            </li>
          ))}
      </ul>
      <Link className="btn-floating btn-large red right" to="/songs/new">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};
