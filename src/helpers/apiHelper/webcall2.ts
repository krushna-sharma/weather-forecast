import axios from 'axios';
import 'dotenv/config';

export enum Method {
	GET = "get",
	POST = "post",
	PUT = 'put'
}

let isProduction = true

// function getBaseUrl(){
// 	return isProduction ? `http://api.openweathermap.org/` : "http://localhost:4001/"
// }

function getBaseUrl(endpoint: string, requireAppID?: boolean) {
	let baseUrl = isProduction ? `http://api.openweathermap.org/` : "http://localhost:4001/"
	baseUrl = baseUrl + endpoint;
	if (requireAppID !== undefined && requireAppID) {
		baseUrl = baseUrl + getAppID();
	}
	return baseUrl;
}

function getAppID() {
	return `&appid=${process.env.REACT_APP_API_KEY}`
}

export function Api(endpoint: string, method: Method, requireAppID?: boolean, data?: Object) {
	return new Promise((resolve, reject) => {
		axios(getBaseUrl(endpoint, requireAppID), {
			method: method,
			data: data
		})
			.then((resp) => {
				// console.log(resp.data.responseObj)
				resolve(resp.data);
			})
			.catch((err) => {
				console.log(err);
				reject();
			});
	});
}
