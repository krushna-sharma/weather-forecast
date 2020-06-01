import React, { useEffect, useState, useRef } from 'react';
import InputComponent, { ValidationsType } from 'components/formComponents/InputComponent';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addUserData} from '../actions/index'

const LoginPage = (props: RouteComponentProps) => {
	const [ zoom, setZoom ] = useState(false);
	const [ name, setName ] = useState('');
	const [ password, setPassword ] = useState('');

	const nameRef: any = useRef();
    const passwordRef: any = useRef();
    
    let dispatch = useDispatch()

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
            name:name,
            password:password
        }

		if (name.length === 0) {
			nameRef.current.value = 'krushna';
			nameRef.current.value = '';
			nameRef.current!.focus();
		} else if (password.length === 0) {
			passwordRef.current.value = 'krushna';
			passwordRef.current.value = '';
			passwordRef.current!.focus();
		}
		if (name === 'admin' && password === 'admin') {
            dispatch(addUserData(body))
			props.history.push('/home');
		} else {
			// nameRef.current.value=""
			passwordRef.current.value = '';
			passwordRef.current!.focus();
		}
	};

	return (
		<div>
			<div className="blackHalf bigFont font-weight-bold pl-5 pt-5">WEATHERIFY</div>
			<div className="sun" />
			<div className="centerEverything fullPage">
				<div className={`loginContainer p-3 ${zoom ? 'zoom' : ''}`}>
					<h3 className="font-weight-bold">Login</h3>
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
									setPassword(e);
								}}
								isCompulsory={true}
								validatefor={ValidationsType.COMPULSORY}
								label="Password"
							/>
						</div>
					</div>
					<div className="centerEverything">
						<button
							className="mt-3 themeBtn"
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
	);
};

export default withRouter(LoginPage);
