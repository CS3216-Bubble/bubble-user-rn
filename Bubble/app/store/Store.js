// Create main redux store for propagation
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import { routeReducer } from 'redux-simple-router';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';
import Reducer from '../reducers/Reducer';
import createLogger from 'redux-logger';


var storage = undefined;
// storage = {blacklist: [], storage: AsyncStorage};

let middleware = [thunk]
if (__DEV__) {
  const logger = createLogger();
  middleware = [...middleware, logger]
  // middleware = [...middleware]

}

const Store = createStore(Reducer, compose(applyMiddleware(...middleware), autoRehydrate()))
// persistStore(Store, storage, () => {
//   // console.log('restored')
// })
// persistStore(Store)

export default Store;
