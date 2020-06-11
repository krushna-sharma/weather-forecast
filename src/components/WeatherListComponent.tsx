import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeatherCardComponent from './WeatherCardComponent';
import { actionTypes } from 'actions/actionTypes';

const WeatherListComponent = (props:any) => {

	const weatherDataArr = useSelector((state:any)=>state.weather);
	const cityName = useSelector((state:any)=>state.city)
	const dispacth = useDispatch()

	// let dataList = _.isEmpty(weatherDataArr) ? [] : weatherDataArr[props.cityName].data
	// useEffect(() => {

	// 	// dataList = _.isEmpty(weatherDataArr) ? [] : weatherDataArr[props.cityName].data
	// 	console.log(weatherDataArr)
	// 	console.log(props.weatherDataArr)
		
	// }, [weatherDataArr,props]);

    return (
        <div className="myContainer flex1">
					{!weatherDataArr[cityName] && 
						<div className="centerEverything flex1 full text-white">
							Error
						</div>
					}
					{weatherDataArr!=={}  && weatherDataArr[cityName] &&
						weatherDataArr[cityName][0].map((weatherData: any, index: number) => { 
							return (
								<WeatherCardComponent
									key={index}
									isSelected={props.dataNo === index ? true : false}
									data={weatherData}
									onClickCallback={() => dispacth({type:actionTypes.CHANGE_SELECTED_CARD_NO,payload:index})}
								/>
							);
						// return(<div style={{color:'white'}}>{index}</div>)
						})
				// <div style={{color:'white'}}>hello</div>
						}
				</div>
    );
}

export default WeatherListComponent;
