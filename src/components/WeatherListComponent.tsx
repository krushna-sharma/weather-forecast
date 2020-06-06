import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WeatherCardComponent from './WeatherCardComponent';
import { actionTypes } from 'actions/actionTypes';
import _ from 'lodash';

const WeatherListComponent = (props:any) => {

    const weatherDataArr = props.data;
	const dispacth = useDispatch()

	let dataList = _.isEmpty(weatherDataArr) ? [] : weatherDataArr[props.cityName].data
	useEffect(() => {

		dataList = _.isEmpty(weatherDataArr) ? [] : weatherDataArr[props.cityName].data
		console.log(dataList)
		
	}, [weatherDataArr,props,dataList]);

    return (
        <div className="myContainer flex1">
					{ dataList.length===0 && 
						<div className="centerEverything flex1 full text-white">
							Error
						</div>
					}
					{dataList.length > 0 &&
						dataList.map((weatherData: any, index: number) => { 
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
