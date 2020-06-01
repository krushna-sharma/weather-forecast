import { IUserData } from "helpers/LocalStorage/LocalStorageHelper"
import { actionTypes } from "./actionTypes"

export const addUserData = (userData: IUserData) => {
    return {
        type: actionTypes.ADD_NEW_USER,
        payload: userData
    }
}

export const deleteUser = () => {
    return {
        type: actionTypes.DELETE_USER
    }
}

export const addWeatherData = (weatherData:any) => {
    return {
        type:actionTypes.ADD_WEATHER_DATA,
        payload:weatherData
    }
}

export const getWeatherData = () => {
    return {
        type:actionTypes.GET_WEATHER_DATA
    }
}

export const getCity = (cityName:string) => {
    return {
        type:actionTypes.CHANGE_CITY,
        payload:cityName
    }
}