import {applyMiddleware, compose, createStore} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
	applyMiddleware(...middleware)
));

export default store;
