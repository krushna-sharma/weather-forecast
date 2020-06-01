import React, { useEffect, useState, useRef } from 'react';
import InputComponent, { ValidationsType } from 'components/formComponents/InputComponent';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserData } from '../actions/index';
import bgImage from '../assets/images/weather.svg';

const LoginPage = (props: RouteComponentProps) => {
	const [ zoom, setZoom ] = useState(false);
	const [ name, setName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ showError, setshowError ] = useState(false);
	const [ errorMsg, setErrorMsg ] = useState('All the fields are compulsory');

	const nameRef: any = useRef();
	const passwordRef: any = useRef();

	let dispatch = useDispatch();

	useEffect(
		() => {
			setTimeout(() => {
				setZoom(true);
			}, 10);
		},
		[ props ]
	);

	const f_handleLogin = () => {
		let body = {
			name: name,
			password: password
		};

		if (name === 'admin' && password === 'admin') {
			dispatch(addUserData(body));
			props.history.push('/home');
		} else {
			// nameRef.current.value=""
			if (name === '') {
				setErrorMsg('Name cannot be empty');
				setshowError(true);
				nameRef.current!.focus();
			} else if (password === '') {
				setErrorMsg('Password cannot be empty');
				setshowError(true);
				passwordRef.current!.focus();
			} else {
				setErrorMsg('Wrong name or password');
				setshowError(true);
				passwordRef.current.value = '';
				passwordRef.current!.focus();
			}
		}
	};

	return (
		<div className="d-flex loginPage">
			<div className="blackHalf d-flex flex-column full">
				<span className=" bigFont font-weight-bold ml-3 mb-5">WEATHERIFY</span>
				<img src={bgImage} alt="bgImage" className="mt-5 m-5 bgImageClass" />
			</div>
			<div className="loginWrapper">
				<div className={`loginContainer p-3 ${zoom ? 'zoom' : ''}`}>
					<div className="d-flex flex-column">
						<h3 className="font-weight-bold">Welcome to Weatherify</h3>
						<div className="d-flex mb-3 flex-column">
							<div className=" ">
								<InputComponent
									myRef={nameRef}
									type="text"
									customClass="full"
									onChangeCallback={(e) => {
										setName(e);
									}}
									isCompulsory={true}
									validatefor={ValidationsType.COMPULSORY}
									label="Name"
								/>
							</div>
							<div className=" ">
								<InputComponent
									myRef={passwordRef}
									type="password"
									customClass="full"
									onChangeCallback={(e) => {
										setshowError(false);
										setPassword(e);
									}}
									isCompulsory={true}
									validatefor={ValidationsType.COMPULSORY}
									label="Password"
								/>
							</div>
						</div>
						{showError && <div className="text-danger font10 centerEverything">{errorMsg}</div>}
						<div className="ml-2">
							<button
								className="mt-2 themeBtn"
								onClick={() => {
									f_handleLogin();
								}}
							>
								Login
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(LoginPage);
