import React from 'react';
import { apiList } from 'helpers/apiHelper/apiList';
import moment from 'moment'

export interface IWeatherDataType {
	dt_txt: string;
	main: {
		feels_like: 0;
		grnd_level: 0;
		humidity: 0;
		pressure: 0;
		sea_level: 0;
		temp: 0;
		temp_kf: 0;
		temp_max: 0;
		temp_min: 0;
	};
    weather: [{ 'description': ''; icon: ''; main: '' }];
    wind:{speed: 0, deg:0};
    clouds:{all:0}
}

export interface IWeatherCardProps {
    data: IWeatherDataType;
    onClickCallback ?: ()=>void;
    isSelected?:boolean;
}

const WeatherCardComponent = (props: IWeatherCardProps) => {
	let { dt_txt, main, weather } = props.data;

	const ktoC = (tempK: number) => {
		return (tempK - 273.15).toFixed(0);
	};

	return (
		<div
            className={`${props.isSelected && props.isSelected ? "selectedWeatherCard":"weatherCard"} centerEverything`}
            onClick={props.onClickCallback!}
			// style={{ background: `${colorArray[Math.floor(Math.random() * colorArray.length) + 1]}` }}
		>
			<div className=" flex-column flex1 centerEverything">
				<div className="font30">{ktoC(main.temp)}°</div>
				<div className="font10">
					<span className="themeFont font-weight-bold">{weather[0].description}</span> 
				</div>
                <div className="font10">
                {ktoC(main.temp_max)}/{ktoC(main.temp_min)}°C
                </div>
			</div>
			<div>   
				<img
					style={{ width: '80px' }}
					src={`${apiList.GET_ICON.replace('{icon_name}', props.data.weather[0].icon)}`}
					alt={weather[0].main}
				/>
			</div>
			<div className="flex1 centerEverything flex-column">
                <div className="impText">{moment(dt_txt,"YYYY-MM-DD HH:mm:ss").format("DD MMMM")}</div>
                <div className="font10">{moment(dt_txt,"YYYY-MM-DD HH:mm:ss").format("hh:mm A")}</div>
			</div>
		</div>
	);
};

export default WeatherCardComponent;
