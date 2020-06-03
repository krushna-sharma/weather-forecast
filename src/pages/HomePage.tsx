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

const pagePath = '/home';

const HomePage = (props: RouteComponentProps) => {
	const weatherDataArr = useSelector((state: any) => state.weather);
	const dataNo = useSelector((state:any)=>state.dataNo)
	let cityName = useSelector((state: any) => state.city);
	let dispatch = useDispatch();

	const [ showAboutUs, setShowAboutUs ] = useState(false);

	useEffect(
		() => {
			dispatch({ type: actionTypes.WEATHER_DATA, payload: cityName });
			let userData = new LocalStorage().getUserFromLocalStorage();
			if (!userData || (userData.name === '' || userData.password === '')) {
				props.history.push('/');
			} else {
				dispatch(addUserData(userData));
			}
			console.log(userData);
		},
		[ dispatch, props, cityName ]
	);

	const getAboutUs = () => {
		return (
			<div>
				<div
					className={`transparentDiv ${showAboutUs ? 'activeT' : ''}`}
					onClick={() => setShowAboutUs(!showAboutUs)}
				/>
				<div className={`${showAboutUs ? 'active' : ''} aboutUs`}>
					<h3 className="mb-4">About US</h3>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, voluptates dignissimos non sunt
					distinctio iste aspernatur sint dolorum minus quia doloremque obcaecati iusto veniam, unde quos
					illum quis iure error!
				</div>
			</div>
		);
	};

	return (
		<div className="fullPage p-5">
			<HeaderComponent onLogout={() => props.history.push('/')} navLinkCallback={(showAboutUs: boolean) => {setShowAboutUs(true);}}/>
			<SelectComponent label="Cities" selectedOptionCallback={(e: ISelectOptionType) => {dispatch(getCity(e.label));}} options={cities}/>
			<div className="d-flex cardHoldder">
				<div className="myContainer flex1 centerEverything text-white">
				{weatherDataArr.length===0 && <div>Error</div>}
					{weatherDataArr.length>0 && weatherDataArr[dataNo] && <FullWeatherComponent data={weatherDataArr[dataNo]} />}
				</div>
				<WeatherListComponent dataNo={dataNo} />
			</div>
			{getAboutUs()}
		</div>
	);
};

export default { component: withRouter(HomePage), pagePath };
