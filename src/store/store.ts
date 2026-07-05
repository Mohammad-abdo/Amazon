import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'


import nextReducer from './nextslice'
import ordersReducer from './ordersSlice'
import reviewsReducer from './reviewsSlice'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const ordersPersistConfig = {
  key: 'orders',
  version: 1,
  storage,
}

const reviewsPersistConfig = {
  key: 'reviews',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, nextReducer)
const persistedOrdersReducer = persistReducer(ordersPersistConfig, ordersReducer)
const persistedReviewsReducer = persistReducer(reviewsPersistConfig, reviewsReducer)
export const store = configureStore({
  reducer: {
    next: persistedReducer,
    orders: persistedOrdersReducer,
    reviews: persistedReviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch