export const GET_ALL_MACHINES = 'GET_ALL_MACHINES';
export const GET_MACHINE_BY_ID = 'GET_MACHINE_BY_ID';
export const UPDATE_MACHINE_BY_ID = 'UPDATE_MACHINE_BY_ID';
export const WS_UPDATE = 'WS_UPDATE';

export const allMachineAction = (machines) => ({
	type: GET_ALL_MACHINES,
	payload: machines
});

export const machineByIdAction = (machine) => ({
	type: GET_MACHINE_BY_ID,
	payload: machine
});

export const updateMachineByIdAction = (machine) => ({
	type: UPDATE_MACHINE_BY_ID,
	payload: machine
});

export const wsHealthUpdateAction = (event) => ({
	type: WS_UPDATE,
	payload: JSON.parse(event.data)
});
