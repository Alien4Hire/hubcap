import * as React from 'react';
import './App.css';
import { TVChartContainer } from './components/TVChartContainer/index';

class App extends React.Component {
	render() {
		return (
			<div className={ App }>
				<header className={ AppHeader }>
					<h1 className={ AppTitle }>
						Powered by Trading View (add header)
					</h1>
				</header>
				<TVChartContainer />
			</div>
		);
	}
}
const App = {
	text-align: center;
},

const AppHeader = {
	display: 'flex',
	justify-content: 'center',
	alignItems: 'center',
	padding: '10px' '0',
	background-color: '#222',
	color: '#fff',
},

const AppTvLogo = {
	height: '45px',
},

const AppReactLogo = {
	display: 'block',
	height: '62px',
},

const AppTitle = {
	display: 'block',
	fontSize: '1.5em',
}

export default App;
