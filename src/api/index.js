import {allMachineAction, machineByIdAction, updateMachineByIdAction, wsHealthUpdateAction} from '../redux/actions';

export const BASE_URL = 'http://localhost:8080';
const SOCKET_URL = 'ws://localhost:1337';
export const WS_SOCKET = new WebSocket(SOCKET_URL);

export const fetchAllMachinesAPI = () => async dispatch => {
	const response = await fetch(`${BASE_URL}/machines`);
	const jsonResponse = await response.json();
	return dispatch(allMachineAction(jsonResponse));
};

export const fetchMachineByIdAPI = (machineId) => async dispatch => {
	const response = await fetch(`${BASE_URL}/machines/${machineId}`);
	const jsonResponse = await response.json();
	return dispatch(machineByIdAction(jsonResponse));
};

export const wsHealthUpdateDispatch = (message) => async dispatch => {
	return dispatch(wsHealthUpdateAction(message));
};

// headers: {
// 			'Content-Type': 'application/json',
// 			'Cache-Control': 'no-cache'
// 		},

export const updateMachineByIdAPI = (data) => async dispatch => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	const response = await fetch(`${BASE_URL}/machines/${data.id}`, {
		method: 'PUT',
		headers: myHeaders,
		body: JSON.stringify(data)
	});
	const jsonResponse = await response.json();
	return dispatch(updateMachineByIdAction(jsonResponse));
};


