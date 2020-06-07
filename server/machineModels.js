const machines = require('./machines.json');

let data = { ...machines };

const order = [
	'99ade105-dee1-49eb-8ac4-e4d272f89fba',
	'4111947a-6c58-4977-90fa-2caaaef88648',
	'57342663-909c-4adf-9829-6dd1a3aa9143',
	'5632e1ec-46cb-4895-bc8b-a91644568cd5'
];

function findAllMachines () {
	return order.map(key => data[key]);
}

function findMachineById (id) {
	return data[id];
}

function setMachineValue (machineId, key, value) {
	if (key === 'id') {
		return;
	}

	const machine = data[machineId];

	if (!machine || (machine && !machine[key])) {
		return;
	}

	data = {
		...data,
		[machineId]: {
			...machine,
			[key]: value
		}
	};
}


function randomProperty (keys, obj) {
	return obj[keys[keys.length * Math.random() << 0]];
}

function updateRandomMachineHealth () {
	const machines = findAllMachines();
	const machineKeys = Object.keys(machines);
	const machine = randomProperty(machineKeys, machines);

	let direction = (Math.floor(Math.random() * 2) === 0) ? 'up' : 'down';
	const adjustment = Math.round(Math.random() * 4) + 1;
	const { health } = machine;

	let updatedHealth = direction === 'up' ? health + adjustment : health - adjustment;

	if (updatedHealth >= 100) {
		updatedHealth = 100 - adjustment;
	} else if (updatedHealth <= 0) {
		updatedHealth = 0 + adjustment;
	}

	setMachineValue(machine.id, 'health', updatedHealth);

	return findMachineById(machine.id);
}

module.exports = {
	findAllMachines,
	findMachineById,
	setMachineValue,
	updateRandomMachineHealth
};
