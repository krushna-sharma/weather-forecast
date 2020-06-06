import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import LocalStorage from 'helpers/LocalStorage/LocalStorageHelper';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, getCity } from '../actions/index';
import { actionTypes } from 'actions/actionTypes';
import SelectComponent from 'components/formComponents/SelectComponent';
import { ISelectOptionType } from '../components/formComponents/SelectComponent';
import HeaderComponent from 'components/HeaderComponent';
import FullWeatherComponent from 'components/FullWeatherComponent';
import { cities } from '../helpers/constsHelpers';
import WeatherListComponent from 'components/WeatherListComponent';
import moment from 'moment';
import _ from 'lodash';

const pagePath = '/home';

const HomePage = (props: RouteComponentProps) => {
	const weatherDataArr = useSelector((state: any) => state.weather);
	const dataNo = useSelector((state: any) => state.dataNo);
	let cityName = useSelector((state: any) => state.city);
	const recentApiCalls = useSelector((state: any) => state.recentApiCalls);
	let dispatch = useDispatch();

	const [ showAboutUs, setShowAboutUs ] = useState(false);

	useEffect(
		() => {
			// getApiCallStatus()
			// .then((callApi) => {
			// 	dispatch({ type: actionTypes.WEATHER_DATA, payload: cityName });
			// })
			// .catch(err=>{
			// 	console.log("Prev data loaded")
			// });
			// console.log(weatherDataArr[cityName]);
			
			// dispatch({type:actionTypes.RECENT_API_CALLS,payload:cityName});
			dispatch({ type: actionTypes.WEATHER_DATA, payload: cityName });
			let userData = new LocalStorage().getUserFromLocalStorage();
			if (!userData || (userData.name === '' || userData.password === '')) {
				props.history.push('/');
			} else {
				dispatch(addUserData(userData));
			}
		},
		[ dispatch, props,weatherDataArr ]
	);

	const getApiCallStatus = (selectedCity:string) => {
		return new Promise((resolve, reject) => {
			// let dataObj = {
			// 	cityName: cityName,
			// 	timestamp: moment().format('x')
			// };
			let recentApiData = recentApiCalls;
			console.log(recentApiData,selectedCity)
			let isCityCalled = _.includes(recentApiData.selectedCities, selectedCity);
			console.log(isCityCalled);
			
			if (!isCityCalled) {
				// dispatch({ type: actionTypes.RECENT_API_CALLS, payload: selectedCity });
				resolve();
			} else if (isCityCalled) {
				let dd = recentApiData.citiesData[selectedCity].timestamp;
				console.log(moment().diff(moment(dd, 'x')))
				if (moment().diff(moment(dd, 'x')) >= 60000) {
					// dispatch({ type: actionTypes.RECENT_API_CALLS, payload: selectedCity });
					resolve();
				}else{
					// dispatch({ type: actionTypes.CHANGE_CITY, payload: selectedCity })
					reject()
				}
			} else {
				reject();
			}
		});
	};

	const getAboutUs = () => {
		let dataC = React.createElement(
			'h3',
			{ class: 'mb-4' },
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, voluptates dignissimos non sunt distinctio iste aspernatur sint dolorum minus quia doloremque obcaecati iusto veniam, unde quos illum quis iure error!'
		);
		return (
			<div>
				<div
					className={`transparentDiv ${showAboutUs ? 'activeT' : ''}`}
					onClick={() => setShowAboutUs(!showAboutUs)}
				/>
				<div className={`${showAboutUs ? 'active' : ''} aboutUs`}>
					<h3 className="mb-4">About US</h3>
					{dataC}
				</div>
			</div>
		);
	};

	return (
		<div className="fullPage p-5">
			<HeaderComponent
				onLogout={() => props.history.push('/')}
				navLinkCallback={(showAboutUs: boolean) => {
					setShowAboutUs(true);
				}}
			/>
			<SelectComponent
				label="Cities"
				selectedOptionCallback={(e: ISelectOptionType) => {
					getApiCallStatus(e.label)
					.then(()=>{
						dispatch({ type: actionTypes.WEATHER_DATA, payload: e.label });
					})
					.catch(()=>{
						console.log("Failed");
						
						dispatch({ type: actionTypes.CHANGE_CITY, payload: e.label })
					})
					// dispatch(getCity(e.label));
				}}
				options={cities}
			/>
			<div className="d-flex cardHoldder">
				<div className="myContainer flex1 centerEverything text-white">
					{_.isEmpty(weatherDataArr[cityName]) && <div>Error</div>}
					{!_.isEmpty(weatherDataArr[cityName])  && <FullWeatherComponent data={weatherDataArr[cityName].data[dataNo]} />}
				</div>
				{/* {weatherDataArr[cityName]!==undefined &&  */}
				<WeatherListComponent dataNo={dataNo} cityName={cityName} data={weatherDataArr}/>
			</div>
			{getAboutUs()}
		</div>
	);
};

export default { component: withRouter(HomePage), pagePath }; 
