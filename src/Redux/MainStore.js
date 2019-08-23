import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import MainReducer from './MainReducer';

const persistConfig = {
    key: 'root',
    storage
};
const persistedReducer = persistReducer(persistConfig, MainReducer);
const store = createStore(MainReducer, applyMiddleware(thunk));
// const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
