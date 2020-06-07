import {combineReducers} from 'redux';
import machineReducer from './machine';

const reducer = combineReducers({
	machines: machineReducer
});

export default reducer;
