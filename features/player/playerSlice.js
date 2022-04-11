import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  playing: false,
  artist: null,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setIsPlaying: state => {
      state.playing = true;
    },
    setNotPlaying: state => {
      state.playing = false;
    },
    setArtist: (state, action) => {
      state.artist = action.payload;
    },
  },
});

export const {setIsPlaying, setNotPlaying, setArtist} = playerSlice.actions;

export default playerSlice.reducer;

// selectors
export const selectIsPlaying = state => state.player.playing;
export const selectArtist = state => state.player.artist;
