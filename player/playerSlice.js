import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  playing: false,
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
  },
});

export const {setIsPlaying, setNotPlaying} = playerSlice.actions;

export default playerSlice.reducer;

// selectors
export const selectIsPlaying = state => state.player.playing;
