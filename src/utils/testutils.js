import {Provider} from 'react-redux';
import {render} from '@testing-library/react';
import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import reducer from '../redux/reducers';
import thunk from 'redux-thunk';

const middleware = [thunk];

export const renderWithRouterAndRedux = (
	ui,
	{route = '/', history = createMemoryHistory({initialEntries: [route]})} = {},
	{
		initialState, store = createStore(reducer,
			initialState, compose(applyMiddleware(...middleware)))
	} = {}
) => ({
	...render(<Router history={history}>
		<Provider store={store}>{ui}</Provider>
	</Router>),
	history,
	store
});
