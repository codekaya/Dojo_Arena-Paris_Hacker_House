import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Axios from 'axios'
import { headers, urlFetchAllGame } from '../../services/configurl'

const initialState = {
  all_games: [],
}

export const fetchAllGame = createAsyncThunk('game/fetchAllGame', async () => {
  const url = urlFetchAllGame()
  const res = await Axios.get(url, headers())

  return res.data
})

export const { reducer, actions } = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.all_games = action.payload
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchAllGame.fulfilled, (state, action) => {
  //       state.all_games = { result: action.payload, inProgress: false }
  //     }),
  //       builder.addCase(fetchAllGame.pending, (state, action) => {
  //         state.all_games = { ...state.all_games, inProgress: true }
  //       }),
  //       builder.addCase(fetchAllGame.rejected, (state, action) => {
  //         state.all_games = { ...state.all_games, inProgress: false }
  //       })
  //   },
})

export const { setGames } = actions
