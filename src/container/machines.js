import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import machineDetails from '../components/machine-details';
import {fetchAllMachinesAPI, fetchMachineByIdAPI, WS_SOCKET, wsHealthUpdateDispatch} from '../api';

const CurrentClient = {};

class Machines extends Component {

	constructor (props) {
		super(props);
	}

	componentDidMount () {
		this.props.getAllMachines();
		CurrentClient.onmessage = (message) => {
			this.props.healthWS(message);
		};
		WS_SOCKET.onmessage = CurrentClient.onmessage;
	}

	componentWillUnmount () {
		WS_SOCKET.onmessage = null;
	}

	goToMachineDetails (machineId) {
		return this.props.history.push(`/machines/${machineId}`);
	}

	render () {
		const renderedMachines = this.props.machines.length > 0 ?
			this.props.machines.map(eachMachine => {
				eachMachine.onClick = () => this.goToMachineDetails(eachMachine.id);
				if (eachMachine.id === this.props.healthUpdate.id) {
					eachMachine.health = this.props.healthUpdate.health;
				}
				return machineDetails(eachMachine);
			}
			) :
			'No Machine Found';
		return (
			<div className='list-group' data-testid='machines'>
				{renderedMachines}
			</div>
		);
	}

	static propTypes = {
		machines: PropTypes.array.isRequired,
		healthUpdate: PropTypes.object.isRequired,
		healthWS: PropTypes.func.isRequired,
		getMachineById: PropTypes.func.isRequired,
		getAllMachines: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

}

const mapStateToProps = (state, ownProps) => ({
	machines: state.machines.allMachines,
	healthUpdate: state.machines.healthUpdate
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getMachineById: machineId => dispatch(fetchMachineByIdAPI(machineId)),
	getAllMachines: () => dispatch(fetchAllMachinesAPI()),
	healthWS: (message) => dispatch(wsHealthUpdateDispatch(message))
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Machines));
