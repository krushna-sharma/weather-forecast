import React, { useState } from 'react';
import LocalStorage from 'helpers/LocalStorage/LocalStorageHelper';

const HeaderComponent = (props: any) => {
	const [ aboutUs, setaboutUs ] = useState(false);

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
                        setaboutUs(!aboutUs)
					}}
				>
					About us
				</div>
			</div>
			<div className="mr-3" style={{cursor:'pointer'}} onClick={()=>{new LocalStorage().clear();props.onLogout()}}>logout</div>
		</div>
	);
};

export default HeaderComponent;
