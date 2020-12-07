import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-community/async-storage'
import reducer from './reducers/index'

const persistConfig = {
  key: 'root',
  version: 0,
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
