import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { fireEvent, render as rtlRender, cleanup } from '@testing-library/react';
import WeatherListComponent from 'components/WeatherListComponent';
import allReducers from '../../reducers';

afterEach(cleanup);

const initialState = {
	dataNo: 0
};

function render(
	ui,
	{ initialState = initialReducerState, store = createStore(allReducers, initialState), ...renderOptions } = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('Testing', () => {
	it('No data loaded from API', () => {
		const { queryByTestId } = render(<WeatherListComponent dataNo={0} />, { initialState: { dataNo: 0 } });
		expect(queryByTestId('list-container')).toHaveTextContent('Error');
	});

	it('Data loaded', () => {
		const initialStateData = {
			dataNo: 0,
			weather: {
				Akola: [
					[
						{
							dt: 1591887600,
							main: {
								temp: 308.28,
								feels_like: 308.51,
								temp_min: 306.58,
								temp_max: 308.28,
								pressure: 998,
								sea_level: 999,
								grnd_level: 969,
								humidity: 39,
								temp_kf: 1.7
							},
							weather: [
								{
									id: 803,
									main: 'Clouds',
									description: 'broken clouds',
									icon: '04n'
								}
							],
							clouds: {
								all: 71
							},
							wind: {
								speed: 4.33,
								deg: 222
							},
							sys: {
								pod: 'n'
							},
							dt_txt: '2020-06-11 15:00:00'
						}
					]
				]
			},
			city:"Akola"
		};
		const {queryByTestId} = render(<WeatherListComponent dataNo={0}/>,{initialState:initialStateData})
		expect(queryByTestId('list-container')).toHaveTextContent('35°broken clouds35/33°C11 June03:00 PM');
	});
});

// test('dfsdfds', () => {
// 	expect(true).toBeTruthy()
// });
