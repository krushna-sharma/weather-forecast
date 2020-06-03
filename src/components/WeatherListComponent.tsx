import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WeatherCardComponent from './WeatherCardComponent';
import { actionTypes } from 'actions/actionTypes';

const WeatherListComponent = (props:any) => {

    const weatherDataArr = useSelector((state: any) => state.weather);
	const dispacth = useDispatch()

    return (
        <div className="myContainer flex1">
					{weatherDataArr.length===0 && 
						<div className="centerEverything flex1 full text-white">
							Error
						</div>
					}
					{weatherDataArr &&
						weatherDataArr.length > 0 &&
						weatherDataArr.map((weatherData: any, index: number) => {
							return (
								<WeatherCardComponent
									key={index}
									isSelected={props.dataNo === index ? true : false}
									data={weatherData}
									onClickCallback={() => dispacth({type:actionTypes.CHANGE_SELECTED_CARD_NO,payload:index})}
								/>
							);
						})}
				</div>
    );
}

export default WeatherListComponent;
