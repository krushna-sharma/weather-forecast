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
	}, [language,dispatch]);

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
			<div className="font10 mr-2" style={{ cursor: 'pointer' }} onClick={()=>{
				if(language === "hi"){
					dispatch({type:"CHANGE_LANGUAGE",payload:"en"})
				}else{
					dispatch({type:"CHANGE_LANGUAGE",payload:"hi"})
				}
			}}>{string.cngLang}</div>
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
