import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

test('renders /machines link', () => {
	const {getByText} = render(<App/>);
	const linkElement = getByText(/machines/i);
	expect(linkElement).toBeInTheDocument();
});
