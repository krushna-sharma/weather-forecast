import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import LocalStorage from 'helpers/LocalStorage/LocalStorageHelper';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData } from '../actions/index';
import { actionTypes } from 'actions/actionTypes';
import SelectComponent from 'components/formComponents/SelectComponent';
import { ISelectOptionType } from '../components/formComponents/SelectComponent';
import HeaderComponent from 'components/HeaderComponent';
import FullWeatherComponent from 'components/FullWeatherComponent';
import { cities } from '../helpers/constsHelpers';
import WeatherListComponent from 'components/WeatherListComponent';
import moment from 'moment';
import _ from 'lodash';
import string from '../helpers/strings';

const pagePath = '/home';

const HomePage = (props: RouteComponentProps) => {
	const weatherDataArr = useSelector((state: any) => state.weather);
	const dataNo = useSelector((state: any) => state.dataNo);
	const language = useSelector((state:any)=>state.language)
	let cityName = useSelector((state: any) => state.city);
	const recentApiCalls = useSelector((state: any) => state.recentApiCalls);
	let dispatch = useDispatch();

	const [ showAboutUs, setShowAboutUs ] = useState(false);
	const [ isApiCalled, setIsApiCalled ] = useState(true);

	useEffect(
		() => {
			if (isApiCalled) {
				console.log(cityName);
				dispatch({ type: actionTypes.WEATHER_DATA, payload: cityName });
				setIsApiCalled(false);
			}
			let userData = new LocalStorage().getUserFromLocalStorage();
			if (!userData || (userData.name === '' || userData.password === '')) {
				props.history.push('/');
			} else {
				dispatch(addUserData(userData));
			}
			string.setLanguage(language);
		},
		[ dispatch, props, weatherDataArr, cityName, isApiCalled,language ]
	);

	const getApiCallStatus = (selectedCity: string) => {
		return new Promise((resolve, reject) => {
			let recentApiData = recentApiCalls;
			let isCityCalled = _.includes(recentApiData.selectedCities, selectedCity);

			if (!isCityCalled) {
				resolve();
			} else if (isCityCalled) {
				let dd = recentApiData.citiesData[selectedCity].timestamp;
				if (moment().diff(moment(dd, 'x')) >= 60000) {
					resolve();
				} else {
					reject();
				}
			} else {
				reject();
			}
		});
	};

	const getAboutUs = () => {
		let dataC = React.createElement('h3', { class: 'mb-4' }, string.dummyText);
		return (
			<div>
				<div
					className={`transparentDiv ${showAboutUs ? 'activeT' : ''}`}
					onClick={() => setShowAboutUs(!showAboutUs)}
				/>
				<div className={`${showAboutUs ? 'active' : ''} aboutUs`}>
					<h3 className="mb-4">{string.aboutUs}</h3>
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
				label={string.cities}
				selectedOptionCallback={(e: ISelectOptionType) => {
					getApiCallStatus(e.label)
						.then(() => {
							dispatch({ type: actionTypes.WEATHER_DATA, payload: e.label });
						})
						.catch(() => {
							console.log('Failed');

							dispatch({ type: actionTypes.CHANGE_CITY, payload: e.label });
						});
					// dispatch(getCity(e.label));
				}}
				options={cities}
			/>
			<div className="d-flex cardHoldder">
				<div className="myContainer flex1 centerEverything text-white">
					{!weatherDataArr[cityName] && <div>Error</div>}
					{weatherDataArr[cityName] && <FullWeatherComponent data={weatherDataArr[cityName][0][dataNo]} />}
				</div>
				{/* {weatherDataArr[cityName]!==undefined &&  */}
				{/* <div>{weatherDataArr[]}</div> */}
				<WeatherListComponent dataNo={dataNo} cityName="Akola" data={weatherDataArr} />
			</div>
			{getAboutUs()}
		</div>
	);
};

export default { component: withRouter(HomePage), pagePath };
