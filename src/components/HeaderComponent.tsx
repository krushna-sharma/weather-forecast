import React, { useState, useEffect } from 'react';
import LocalStorage from 'helpers/LocalStorage/LocalStorageHelper';
import string from '../helpers/strings';
import { useDispatch, useSelector } from 'react-redux';

const HeaderComponent = (props: any) => {
	const [ aboutUs, setaboutUs ] = useState(false);
	const language = useSelector((state:any)=>state.language)
	const dispatch = useDispatch()

	useEffect(() => {
		string.setLanguage(language);
		console.log("lang==>" + language)	
	}, [language,dispatch]);

	const handleLangChange = () => {
		if(language === "hi"){
			dispatch({type:"CHANGE_LANGUAGE",payload:"en"})
		}else if(language === "en"){
			dispatch({type:"CHANGE_LANGUAGE",payload:"hi"})
		}
	}

	return (
		<div className="themeHeader d-flex align-items-baseline">
			<div className="font-weight-bold" style={{ color: '#fff', fontSize: '20px' }}>
				Weatherify
			</div>
			<div className="flex1 d-flex font15 pl-3">
				<div
					className="navLink"
					onClick={() => {
						props.navLinkCallback(!aboutUs);
						setaboutUs(!aboutUs);
					}}
				>
					{string.aboutUs}
				</div>
			</div>
			<div className="font10 mr-2" style={{ cursor: 'pointer' }} 
			onClick={handleLangChange}
			>{string.cngLang}</div>
			<div
				className="mr-3"
				style={{ cursor: 'pointer' }}
				onClick={() => {
					new LocalStorage().clear();
					props.onLogout();
				}}
			>
				{string.logout}
			</div>
		</div>
	);
};

export default HeaderComponent;
