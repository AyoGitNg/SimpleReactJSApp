import {GET_ALL_MACHINES, GET_MACHINE_BY_ID, UPDATE_MACHINE_BY_ID, WS_UPDATE} from '../actions';

const initialState = {
	allMachines: [],
	machineById: {},
	healthUpdate: {}
};

const renameIPAddressKey = (machine) => {
	if (machine.ip_address) {
		machine.ipAddress = machine.ip_address;
		// delete machine.ip_address;
	}
	return machine;
};

const renameIPAddressKeyInArr = (machines) =>
	machines.map(eachMachine => renameIPAddressKey(eachMachine));

const updateMachineNameInArr = (machines, payload) =>
	machines.map(eachMachine => {
		if (payload.id === eachMachine.id) {
			return payload;
		}
		return eachMachine;
	});

const machineReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_MACHINES:
			return {
				allMachines: renameIPAddressKeyInArr(action.payload),
				machineById: state.machineById,
				healthUpdate: state.healthUpdate
			};
		case GET_MACHINE_BY_ID:
			return {
				allMachines: state.allMachines,
				machineById: renameIPAddressKey(action.payload),
				healthUpdate: state.healthUpdate
			};
		case UPDATE_MACHINE_BY_ID:
			return {
				allMachines: updateMachineNameInArr(state.allMachines, action.payload),
				machineById: action.payload,
				healthUpdate: state.healthUpdate
			};
		case WS_UPDATE:
			return {
				allMachines: state.allMachines,
				machineById: state.machineById,
				healthUpdate: action.payload
			};
		default:
			return state;
	}
};

export default machineReducer;
