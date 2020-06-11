import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeatherCardComponent from './WeatherCardComponent';
import { actionTypes } from 'actions/actionTypes';

const WeatherListComponent = (props: any) => {
	const weatherDataArr = useSelector((state: any) => state.weather);
	const cityName = useSelector((state:any)=> state.city)
	const dispacth = useDispatch();

	return (
		<div data-testid="list-container" className="myContainer flex1">
			{!weatherDataArr[cityName] && <div className="centerEverything flex1 full text-white">Error</div>}
			{weatherDataArr !== {} &&
				weatherDataArr[cityName] &&
				weatherDataArr[cityName][0].map((weatherData: any, index: number) => {
					return (
						<WeatherCardComponent
							key={index}
							isSelected={props.dataNo === index ? true : false}
							data={weatherData}
							onClickCallback={() =>
								dispacth({ type: actionTypes.CHANGE_SELECTED_CARD_NO, payload: index })}
						/>
					);
				})}
		</div>
	);
};

export default WeatherListComponent;
