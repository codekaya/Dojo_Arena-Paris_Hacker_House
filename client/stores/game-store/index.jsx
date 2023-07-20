import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Axios from 'axios'
import { seperatePlayersByState } from '../../utils/player'
import { headers, urlFetchGameWithId } from '../../services/configurl'

const initialState = {
  current_player: {},
  players: [],
  players_by_states: {
    attacking: [],
    hiding: [],
    hunting: [],
    playing: [],
  },
  character_popup: {
    open: false,
    player_id: '',
    position: {
      x: 0,
      y: 0,
    },
  },
  history: {
    hunts: [],
    hides: [],
    attacks: [],
  },
  accounts: [],
  wallet_connected: false,
  current_game: {
    _id: '',
    game_id: '',
    name: '',
    nft_collection_address: '',
    winner: '',
    game_creator: '',
    turn_duration: '',
    max_players: '-',
    num_players: '-',
    start_time: '',
    initial_hp: '',
    hunger_level: '',
    is_active: '',
    current_tour: '',
    entry_fee: '',
    prize: '',
  },
}

export const fetchGameWithId = createAsyncThunk('game/fetchGameWithId', async (game_id) => {
  const url = urlFetchGameWithId()
  const res = await Axios.post(url, { game_id }, headers())

  return res.data
})

export const { reducer, actions } = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGame: (state, action) => {
      state.current_game = action.payload
    },
    setPlayers: (state, action) => {
      return {
        ...state,
        players: action.payload,
        players_by_states: seperatePlayersByState(action.payload),
      }
    },
    setCurrentPlayerInfo: (state, action) => {
      state.current_player = action.payload
    },
    setCurrentPlayerName: (state, action) => {
      if (!action?.payload) return state

      if (state?.current_player?.player_data) {
        state.current_player.player_data.name = action.payload

        const playerIndex = state.players.findIndex(
          (elm) => elm?.player_id === state?.current_player?.player_data?.player_id,
        )

        state.players[playerIndex].name = action?.payload
      }
    },
    setCharacterPopupInfo: (state, action) => {
      state.character_popup = action.payload
    },
    setHistory: (state, action) => {
      return {
        ...state,
        history: {
          ...state.history,
          attacks: action.payload.attacks ? action.payload.attacks : state.history.attacks,
          hides: action.payload.hides ? action.payload.hides : state.history.hides,
          hunts: action.payload.hunts ? action.payload.hunts : state.history.hunts,
        },
      }
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload
    },
    setWalletConnected: (state, action) => {
      state.wallet_connected = action.payload
    },
  },
})

export const {
  setPlayers,
  setCurrentPlayerInfo,
  setCurrentPlayerName,
  setCharacterPopupInfo,
  setHistory,
  setAccounts,
  setWalletConnected,
  setCurrentGame,
} = actions
