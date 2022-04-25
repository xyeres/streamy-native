import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import TrackPlayer, {State} from 'react-native-track-player';

export const togglePlayback = createAsyncThunk(
  'player/togglePlayback',
  async () => {
    const trackIndex = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackIndex);
    const state = await TrackPlayer.getState();
    let isPlaying = null;

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

export const onTrackChanged = createAsyncThunk(
  'player/onTrackChanged',
  async (trackIndex, thunkAPI) => {
    if (!trackIndex) {
      return;
    }
    const track = await TrackPlayer.getTrack(trackIndex);
    thunkAPI.dispatch(setNowPlaying(track));
    thunkAPI.dispatch(setIsPlaying());
    return track;
  },
);

export const resetAndPlayList = createAsyncThunk(
  'player/resetAndPlayList',
  async (payload, thunkAPI) => {
    const {tracks, index, track} = payload;
    // Sync now playing
    thunkAPI.dispatch(setNowPlaying(track));
    thunkAPI.dispatch(setIsPlaying());
    // Setup player
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
    return track;
  },
);

export const skipSong = createAsyncThunk('player/skipSong', async () => {
  await TrackPlayer.skipToNext();
});

const initialState = {
  isPlaying: false,
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
  reducers: {
    setNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    setIsPlaying: state => {
      state.isPlaying = true;
    },
    unsetIsPlaying: state => {
      state.isPlaying = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(addTrackToQueue.fulfilled, (state, action) => {
      //TODO handle when track is added to queue
    });
    builder.addCase(togglePlayback.fulfilled, (state, action) => {
      state.isPlaying = action.payload.isPlaying;
      state.nowPlaying = action.payload.track;
    });
    builder.addCase(resetAndPlayList.fulfilled, (state, action) => {
      // Do nothing, we done
    });
    builder.addCase(skipSong.fulfilled, (state, action) => {
      //TODO what happens now?
    });
  },
});
export default playerSlice.reducer;

// Actions
export const {unsetIsPlaying, setIsPlaying, setNowPlaying} =
  playerSlice.actions;

// Selectors
export const selectNowPlaying = state => state.player.nowPlaying;
export const selectIsPlaying = state => state.player.isPlaying;
export const selectArtist = state => state.player.artist;
