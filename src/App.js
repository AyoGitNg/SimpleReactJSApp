import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Machines from './container/machines';
import './App.css';
import UpdateMachineDetails from './container/update-machine-details';

function App () {
	return (
		<Router>
			<Provider store={store}>
				<div className='App'>
					<header className='App-header'>
						<img alt='logo' height='272' width='800' src='https://i.imgur.com/jcvsFKh.png'/>
					</header>

					<nav className='App-nav'>
						<Link to='/'>Home</Link>
						<Link to='/machines'>Machines</Link>
					</nav>

					<Switch>
						<Route path='/machines' exact>
							<Machines/>
						</Route>

						<Route path='/machines/:machineId' exact>
							<UpdateMachineDetails/>
						</Route>

					</Switch>
				</div>
			</Provider>
		</Router>
	);
}

export default App;
