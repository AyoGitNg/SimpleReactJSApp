import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const machineDetails = ({id, name, ipAddress, health, onClick}) => {
	return (
		<div className='card list-group-item' key={id} onClick={onClick}>
			<div className='card-body'>
				<div className='card-title'>Name {name}</div>
				<div className='card-title'>IP {ipAddress}</div>
				<div className='card-title'>Health {health}</div>
			</div>
		</div>
	);
};

machineDetails.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	ipAddress: PropTypes.string.isRequired,
	health: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
};

export default machineDetails;
