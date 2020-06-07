const models = require('./machineModels');

function getAllMachines (ctx, next) {
	ctx.body = models.findAllMachines();
}

function getMachineById (ctx, next) {
	ctx.body = models.findMachineById(ctx.params.id);
}

function putMachineById (ctx, next) {
	const { body } = ctx.request;
	const { id } = ctx.params;

	Object.keys(body).forEach(key => {
		models.setMachineValue(id, key, body[key]);
	});

	ctx.body = models.findMachineById(id);
}

module.exports = {
	getAllMachines,
	getMachineById,
	putMachineById
};
