// Create main redux store for propagation
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import { routeReducer } from 'redux-simple-router';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';
import Reducer from '../reducers/Reducer';

var storage = undefined;
// storage = {blacklist: [], storage: AsyncStorage};

const Store = compose(autoRehydrate())(createStore)(Reducer)
persistStore(Store, storage, () => {
  console.log('restored')
})
// persistStore(Store)

export default Store;