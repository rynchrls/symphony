import { createSlice } from "@reduxjs/toolkit";

const initial = JSON.parse(localStorage.getItem('initial'))
const userSlice = createSlice({
  name: "user",
  initialState: {
    album: initial?.album ||[],
    playlist: initial?.playlist ||[],
    artist: initial?.artist || [],
    track: initial?.track || [],
    podcast: initial?.podcast || [],
    selectedMusic: "",
  },
  reducers: {
    setInitialState: (state, action) => {
      state.album = action.payload.album;
      state.playlist = action.payload.playlist;
      state.artist = action.payload.artist;
      state.track = action.payload.track;
      state.podcast = action.payload.podcast;
    },
    setSelectedMusic: (state, action) => {
      state.selectedMusic = action.payload;
    },
  },
});

export const { setInitialState, setSelectedMusic } = userSlice.actions;

export default userSlice.reducer;
