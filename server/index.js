const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const WebSocket = require('ws');
const api = require('./api');
const machineModels = require('./machineModels');

const app = new Koa();
app.use(bodyParser());
app.use(cors());

const router = new Router();

router
	.use(bodyParser())
	.get('/machines', api.getAllMachines)
	.get('/machines/:id', api.getMachineById)
	.put('/machines/:id', api.putMachineById);

app
	.use(router.routes())
	.use(router.allowedMethods())
	.listen(8080, () =>
		console.log('Server listening on port 8080')
	);

const wss = new WebSocket.Server({ port: 1337 });


wss.on('connection', function connection (ws) {
	setInterval(() => {
		const updatedMachine = machineModels.updateRandomMachineHealth();

		ws.send(JSON.stringify({
			type: 'HEALTH_UPDATE',
			id: updatedMachine.id,
			health: updatedMachine.health
		}));
	}, 500);
});

console.log('WebSocket listening on port 1337');
