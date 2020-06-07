import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {fetchMachineByIdAPI, updateMachineByIdAPI, WS_SOCKET, wsHealthUpdateDispatch} from '../api';
import '../App.css';

const CurrentClient = {};

class UpdateMachineDetails extends Component {

	constructor (props) {
		super(props);
		this.state = {name: ''};
	}

	componentDidMount () {
		let machineId = this.props.match.params.machineId;
		// for test
		if (machineId === undefined) {
			machineId = this.props.history.location.pathname.split('/')[2];
		}
		this.props.getMachineById(machineId)
			.then(res => {
				this.setState({name: res.payload.name});
			});

		CurrentClient.onmessage = (message) => {
			this.props.healthWS(message);
		};
		WS_SOCKET.onmessage = CurrentClient.onmessage;
	}

	componentWillUnmount () {
		WS_SOCKET.onmessage = null;
	}

	render () {
		const {id, ipAddress, health} = this.props.machine;

		const handleChange = (event) => this.setState({name: event.target.value});

		let renderedMachine = 'No Machine Details found';
		if (this.props.machine) {
			if (this.props.machine.id === this.props.healthUpdate.id) {
				this.props.machine.health = this.props.healthUpdate.health;
			}
			renderedMachine = (
				<div className='card list-group-item'>
					<div className='card-body'>
						<div className='card-title'>ID {id}</div>
						<div className='card-title'>IP {ipAddress}</div>
						<div className='card-title'>Health {health}</div>
						<div className='card-title'>Name
							<input name='name' type='text' value={this.state.name || ''} onChange={handleChange}/>
							<button onClick={event => {
								const newValue = {
									// eslint-disable-next-line camelcase
									id, ip_address: ipAddress,
									health, name: this.state.name
								};
								this.props.updateMachineById(newValue);
							}

							}>Submit
							</button>
						</div>

					</div>
				</div>
			);
		}

		return (
			<div className='list-group' data-testid='update-machine'>
				{renderedMachine}
			</div>
		);
	}

	static propTypes = {
		machine: PropTypes.object.isRequired,
		healthUpdate: PropTypes.object.isRequired,
		healthWS: PropTypes.func.isRequired,
		getMachineById: PropTypes.func.isRequired,
		updateMachineById: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

}

const mapStateToProps = (state, ownProps) => ({
	machine: state.machines.machineById,
	healthUpdate: state.machines.healthUpdate
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getMachineById: machineId => dispatch(fetchMachineByIdAPI(machineId)),
	updateMachineById: (body) => dispatch(updateMachineByIdAPI(body)),
	healthWS: (message) => dispatch(wsHealthUpdateDispatch(message))
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(UpdateMachineDetails));
