import React from 'react';
import './App.css';
import './assets/css/styles.css'
import './bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Error404Page from 'pages/Error404Page';
import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';
// import TempPage from 'pages/TempPage';

interface IWeatherApiResponse {
	city: any;
	cnt: number;
	list: any;
}

function App() {
	// const [ data, setdata ] = useState([]);

	// useEffect(() => {
	// 	Api(apiList.GET_WEATHER_DATA.replace('{city_name}', 'Akola'), Method.GET, true)
	// 		.then((resp: any) => {
	// 			console.log(resp);
	// 			let response: IWeatherApiResponse = resp;
	// 			setdata(response.list);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	return (
		// <div className="App">
		// 	{data.map((weatherData: any, index: number) => {
		// 		return (
		// 			<img key={index} src={`${apiList.GET_ICON.replace('{icon_name}', weatherData.weather[0].icon)}`} alt="weather_icon" />
		// 		);
		// 	})}
		// </div>
		<ErrorPage>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={LoginPage} />
						{/* <Route exact path="/" component={TempPage} /> */}
						<Route exact path={HomePage.pagePath} component={HomePage.component} />
						{/* <Route exact path="/test" component={TestingPage} /> */}
						{/* <Route exact component={Error404Page} /> */}
						<Route path="*" component={Error404Page} />
					</Switch>
				</BrowserRouter>
		</ErrorPage>
	);
}

export default App;
