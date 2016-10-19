import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routeReducer } from 'redux-simple-router';
import BubbleSocketReducer from '../reducers/BubbleSocketReducer';

const reducers = {
  socketHandler: BubbleSocketReducer,
};
const reducer = combineReducers(reducers);
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);

const Store = createStoreWithMiddleware(reducer);

export default Store;