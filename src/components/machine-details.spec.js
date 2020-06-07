import React from 'react';
import renderer from 'react-test-renderer';

import machineDetails from './machine-details';

test('Machine Details', () => {
	const machine = {
		id: '99ade105-dee1-49eb-8ac4-e4d272f89fba',
		name: 'Machine 1',
		ip_address: '127.0.0.31',
		health: 60,
		onClick: jest.fn()
	};

	const tree = renderer.create(<machineDetails health={machine.health} ip_address={machine.ip_address}
												 onClick={machine.onClick} id={machine.id}
												 name={machine.name}/>);
	expect(tree).toMatchSnapshot();

});
