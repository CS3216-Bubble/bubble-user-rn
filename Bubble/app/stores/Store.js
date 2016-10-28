import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routeReducer } from 'redux-simple-router';
import Reducer from '../reducers/Reducer';

const reducers = {
  socketHandler: Reducer,
};
const reducer = combineReducers(reducers);
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);

const Store = createStoreWithMiddleware(reducer);

export default Store;