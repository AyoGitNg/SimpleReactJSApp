import React from 'react';
import {cleanup, screen} from '@testing-library/react';
import fetchMock from 'fetch-mock';

import {renderWithRouterAndRedux} from '../utils/testutils';
import Machines from './machines';
import {BASE_URL} from '../api';


describe('Machines Spec Test', () => {

	afterEach(cleanup);

	beforeEach(() => {

		fetchMock.get(`${BASE_URL}/machines`, {
			body: [{
				'id': '99ade105-dee1-49eb-8ac4-e4d272f89fba',
				'name': 'Machine 1',
				'ip_address': '127.0.0.31',
				'health': 60
			}, {
				'id': '4111947a-6c58-4977-90fa-2caaaef88648',
				'name': 'Machine 2',
				'ip_address': '127.0.0.4',
				'health': 100
			}, {
				'id': '57342663-909c-4adf-9829-6dd1a3aa9143',
				'name': 'Machine 3',
				'ip_address': '127.0.0.55',
				'health': 75
			}, {
				'id': '5632e1ec-46cb-4895-bc8b-a91644568cd5',
				'name': 'Machine 4',
				'ip_address': '127.0.0.3',
				'health': 20
			}],
			headers: {'content-type': 'application/json'}
		});
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	test('Machine Spec', async () => {
		const route = '/machine';
		const {container} = renderWithRouterAndRedux(<Machines/>, {route}, {
			allMachines: [],
			machineById: {}
		});

		const greetingNode = await screen.findByTestId('machines');
		expect(fetchMock.called('^http://localhost:8080/machines'));
		expect(greetingNode).toHaveTextContent('Machine');
	});


});
