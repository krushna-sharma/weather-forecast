export interface IUserData{
    name:string;
    password:string;
}

export default class LocalStorage{
    getLocalStorage(keyname:string):any{
        if(localStorage.getItem(keyname)=== "undefined"){
            return {};
        }

        return localStorage.getItem(keyname);
    }

    getUserFromLocalStorage():IUserData{
        let userData = JSON.parse(this.getLocalStorage("loggedInUser")) as IUserData;

        return userData;
    }

    clear(){
        localStorage.clear()
    }
}