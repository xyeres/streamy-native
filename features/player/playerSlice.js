import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import TrackPlayer, {State} from 'react-native-track-player';
import {toggleTrackPlayerPlayback} from './trackPlayer';

export const togglePlayback = createAsyncThunk(
  'player/togglePlayback',
  async () => {
    const trackIndex = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackIndex);
    const state = await TrackPlayer.getState();
    let isPlaying;
    if (trackIndex == null) {
      // TODO: Perhaps present an error or restart the playlist?
    } else {
      if (state !== State.Playing) {
        await TrackPlayer.play();
        isPlaying = true;
      } else {
        await TrackPlayer.pause();
        isPlaying = false;
      }
    }
    return {
      isPlaying,
      track: trackObject,
    };
  },
);

export const addTrackToQueue = createAsyncThunk(
  'player/addTrackToQueue',
  async (track, thunkAPI) => {
    await TrackPlayer.add([track]);
    return track;
  },
);

export const resetAndPlayList = createAsyncThunk(
  'player/resetAndPlayList',
  async (payload, api) => {
    const {tracks, index, track} = payload;
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
    return track;
  },
);

const initialState = {
  playing: false,
  nowPlaying: {
    id: null,
    url: null,
    title: null,
    artist: null,
    album: null,
    duration: null,
    artwork: null,
  },
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addTrackToQueue.fulfilled, (state, action) => {
      state.nowPlaying = action.payload;
    });
    builder.addCase(togglePlayback.fulfilled, (state, action) => {
      state.playing = action.payload.isPlaying;
      state.nowPlaying = action.payload.track;
    });
    builder.addCase(resetAndPlayList.fulfilled, (state, action) => {
      state.nowPlaying = action.payload;
    });
    builder.addCase(resetAndPlayList.rejected, (state, action) => {
      state.nowPlaying = action.payload;
    });
  },
});
export default playerSlice.reducer;

// Actions
export const {setIsPlaying, setNotPlaying, setArtist} = playerSlice.actions;

// Selectors
export const selectNowPlaying = state => state.player.nowPlaying;
export const selectIsPlaying = state => state.player.playing;
export const selectArtist = state => state.player.artist;
