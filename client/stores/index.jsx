import { configureStore } from '@reduxjs/toolkit'
import debounce from 'lodash/debounce'
import { reducer as gameReducer } from './game-store'
import { reducer as gamesReducer } from './games-store'
import logger from 'redux-logger'
import { batchedSubscribe } from 'redux-batched-subscribe'

const debounceNotify = debounce((notify) => notify())

export const store = () =>
  configureStore({
    reducer: {
      game: gameReducer,
      games: gamesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [batchedSubscribe(debounceNotify)],
  })
