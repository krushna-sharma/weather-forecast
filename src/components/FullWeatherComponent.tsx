import React from 'react';
import { IWeatherCardProps } from './WeatherCardComponent';
import { apiList } from 'helpers/apiHelper/apiList';
import { useSelector } from 'react-redux';
import moment from 'moment';

const FullWeatherComponent = (props: IWeatherCardProps) => {
	let { dt_txt, main, weather, wind, clouds } = props.data;
	let city = useSelector((state: any) => state.city);
	const ktoC = (tempK: number) => {
		return (tempK - 273.15).toFixed(0);
	};

	const getTableData = (lhs: string, rhs: number | string) => {
		return (
			<div className="d-flex mt-1 mb-1">
				<span>{lhs}:&nbsp;</span>
				<span className="themeFont">{rhs}</span>
			</div>
		);
	};

	return (
		<div className="leftContainer centerEverything flex-column">
			<div className="font30 mb-3">{city.toUpperCase()}</div>
			<img
				style={{ width: '100px' }}
				src={`${apiList.GET_ICON.replace('{icon_name}', weather[0].icon)}`}
				alt={weather[0].main}
			/>
			<div className="font30">{ktoC(main.temp)}°C</div>
			<div className="themeFont font-weight-bold font24">{weather[0].description}</div>
			<div className="d-flex flex1 justify-space-between mt-1">
				<div className="d-flex flex-column font10 mr-4">
					{getTableData('Min. temp', ktoC(main.temp_min))}
					{getTableData('Max. temp', ktoC(main.temp_max))}
					{getTableData('Speed/deg', wind.speed + '/' + wind.deg)}
					{getTableData('Clouds', clouds.all)}
				</div>
				<div className="d-flex flex-column font10">
					{getTableData('Min. temp', main.temp_min)}
					{getTableData('Max. temp', main.temp_max)}
					{getTableData('Speed/deg', wind.speed + '/' + wind.deg)}
					{getTableData('Clouds', clouds.all)}
				</div>
			</div>
			<div className="font10 mt-3">{moment(dt_txt, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM hh:mm a')}</div>
		</div>
	);
};

export default FullWeatherComponent;
