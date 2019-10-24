export type ID = {
  id?: string;
};

export interface Song extends ID {
  title?: string;
  description?: string;
  lyrics?: Lyrics[];
}

export interface SongsData {
  songs: Song[];
}

export interface SongData {
  song: Song;
}

export interface Lyrics {
  id: string;
  likes?: number;
  content?: string[];
}
