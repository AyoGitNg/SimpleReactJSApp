import React from 'react';
import {cleanup, screen} from '@testing-library/react';
import fetchMock from 'fetch-mock';

import {renderWithRouterAndRedux} from '../utils/testutils';
import {BASE_URL} from '../api';
import UpdateMachineDetails from './update-machine-details';


describe('Update Machine Spec Test', () => {

	const mockMachine = {
		'id': '99ade105-dee1-49eb-8ac4-e4d272f89fba',
		'name': 'Machine 1',
		'ip_address': '127.0.0.31',
		'health': 60
	};

	afterEach(cleanup);

	beforeEach(() => {

		fetchMock.get(`${BASE_URL}/machines/99ade105-dee1-49eb-8ac4-e4d272f89fba`, {
			body: mockMachine,
			headers: {'content-type': 'application/json'}
		});
	});

	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	test('Machine Spec', async () => {
		const route = '/machine/99ade105-dee1-49eb-8ac4-e4d272f89fba';
		const {container} = renderWithRouterAndRedux(<UpdateMachineDetails/>, {route}, {
			allMachines: [mockMachine],
			machineById: mockMachine
		});

		const greetingNode = await screen.findByTestId('update-machine');
		expect(fetchMock.called('^http://localhost:8080/machines/99ade105-dee1-49eb-8ac4-e4d272f89fba'));
		expect(greetingNode).toHaveTextContent('127.0.0.31');
	});


});
