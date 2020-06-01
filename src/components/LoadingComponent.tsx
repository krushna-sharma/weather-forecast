import Loader from 'react-loader-spinner';
import React from 'react';
import { useSelector } from 'react-redux';

const LoadingComponent = (props: any) => {
	let loadingStatus = useSelector((state: any) => state.loading);

	return loadingStatus ? (
		<div className="themeLoader">
			<Loader
				type="TailSpin"
				color="#f57d43"
				height={60}
				width={60}
				visible={loadingStatus} //3 secs
			/>
		</div>
	) : (
		<div />
	);
};

export default LoadingComponent;
