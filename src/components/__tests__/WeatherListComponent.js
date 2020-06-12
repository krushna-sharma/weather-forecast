import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { fireEvent, render as rtlRender, cleanup } from '@testing-library/react';
import WeatherListComponent from 'components/WeatherListComponent';
import allReducers from '../../reducers';
import { Api, Method } from '../../helpers/apiHelper/webcall2';
import { apiList } from '../../helpers/apiHelper/apiList';

afterEach(cleanup);

// jest.mock('axios',()=>({get:jest.fn()}))

const initialReducerState = {
	dataNo: 0,
	user: {},
	weather: {},
	city: '',
	loading: false,
	dataNo: 0,
	'recentApiCalls:': {}
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
	// jest.mock('axios',()=>({get:jest.fn()}))

	const url = 'http://api.openweathermap.org/data/2.5/forecast?q=Akola&appid=3fbb2b31fd3e77c536be64abc677a4d1';

	// it('making an async api call', async () => {
	// 	const resp = await Api(apiList.GET_WEATHER_DATA.replace("{city_name}","Akola"),Method.GET,true)
	// 	console.log(resp)
	// });

	it('No data loaded from API', () => {
		const { queryByTestId } = render(<WeatherListComponent dataNo={0} />);
		expect(queryByTestId('list-container')).toHaveTextContent('Error');
	});

	it('Data loaded', async () => {
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
			city: 'Akola'
		};
		const resp = await Api(apiList.GET_WEATHER_DATA.replace('{city_name}', 'Akola'), Method.GET, true);
		const tree = await render(<WeatherListComponent dataNo={0} />, {
			initialState: {
				weather: { Akola: [resp.list] },
				city:"Akola"
			}
		});
		expect(tree).toMatchSnapshot();
		// expect(tree.queryByTestId('list-container')).toHaveTextContent('35°broken clouds35/33°C11 June03:00 PM');
		await console.log(tree.queryByTestId('list-container').children.length);
		expect(tree.queryByTestId('list-container').childNodes.length).toBe(40)
	});
});

// test('dfsdfds', () => {
// 	expect(true).toBeTruthy()
// });
