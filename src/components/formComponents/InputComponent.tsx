import React, { Component } from 'react';
import moment from 'moment';

export interface IInputFieldProps {
	type?: string;
	isCompulsory?: boolean;
	label?: string;
	validatefor?: ValidationsType;
	customClass?: string;
	customContainerClass?: string;
	id?: string;
	// onChangeCallback: (e: string | number) => void
	myRef?: any;
	onChangeCallback: (e: string) => void;
	defaultValue?: string | null;
}

export interface IValidations {
	EMAIL: string;
	MOBILE_NO: number;
}

export enum ValidationsType {
	EMAIL = 'email',
	MOBILE_NO = 'mobileNo',
	COMPULSORY = 'compulsory',
	NO_RESTRICTIONS = 'noRestrictions'
}

export enum ValidationMessage {
	EMAIL = 'Not valid email',
	MOBILE_NO = 'Not valid mobile number',
	COMPULSORY = 'Cannot be empty'
}

class InputComponent extends Component<IInputFieldProps> {
	state = {
		showErrorMessage: false,
		showPassword: false
	};

	validateEmail(email: string) {
		var re = /\S+@\S+\.\S+/;
		return re.test(email);
	}

	validateMobileNo(mobileNo: string) {
		console.log(mobileNo.length);
		console.log(' length-->', mobileNo.length);
		if (mobileNo.length === 10) {
			return false;
		} else {
			return true;
		}
	}

	toggleShowPassword() {
		this.setState((prevState: any) => ({
			showPassword: !prevState.showPassword
		}));
	}

	render() {
		return (
			<div className={`ml-2 mr-2 mt-3 ${this.props.customContainerClass ? this.props.customContainerClass : ''}`}>
				<div className="inputLabel">
					{this.props.label}
					<span className="text-danger">
						{this.props.validatefor === ValidationsType.COMPULSORY ||
						this.props.validatefor === ValidationsType.MOBILE_NO ? (
							'*'
						) : (
							''
						)}
					</span>
				</div>
				{this.props.type !== 'date' && (
					<div className={`${this.props.type === 'password' ? '' : ''}`}>
						<input
							id={this.props.id!}
							// autoComplete="new-password"
							defaultValue={this.props.defaultValue!}
							className={`inputField ${this.state.showErrorMessage ? 'redBorder' : ''} ${this.props
								.customClass
								? this.props.customClass
								: ''}`}
							// type={(this.props.type==="password" && this.state.showPassword) ? "text" : this.props.type}
							type={this.props.type}
							ref={this.props.myRef}
							onChange={(e: any) => {
								if (this.props.validatefor) {
									if (this.props.validatefor === ValidationsType.EMAIL) {
										// this.validateEmail(e.target.value)
										this.props.onChangeCallback(e.target.value);
										this.setState({
											showErrorMessage:
												!this.validateEmail(e.target.value) ||
												(e.target.value.length > 0 ? false : true)
										});
									} else if (this.props.validatefor === ValidationsType.COMPULSORY) {
										this.props.onChangeCallback(e.target.value);
										this.setState({
											showErrorMessage: e.target.value.length > 0 ? false : true
										});
									} else if (this.props.validatefor === ValidationsType.MOBILE_NO) {
										this.props.onChangeCallback(e.target.value);
										this.setState({
											showErrorMessage:
												this.validateMobileNo(e.target.value) ||
												(e.target.value.length > 0 ? false : true)
										});
									} else {
										this.props.onChangeCallback(e.target.value);
									}
								} else {
									this.props.onChangeCallback(e.target.value);
								}
							}}
						/>
						{/* {this.props.type === 'password' && (
							<span className="passwordToggler" onClick={() => this.toggleShowPassword()}>
								{this.state.showPassword ? 'HIDE' : 'SHOW'}
							</span>
						)} */}
					</div>
				)}
				{this.props.type === 'date' && (
					<input
						className="inputField"
						type="date"
						defaultValue={this.props.defaultValue!}
						min={moment().format('YYYY-MM-DD')}
						onChange={(ref) => this.props.onChangeCallback(ref.target.value)}
					/>
				)}
				{this.state.showErrorMessage && (
					<div className="errorMsg text-danger smallFont">
						{ValidationsType.EMAIL === this.props.validatefor && <div>{ValidationMessage.EMAIL}</div>}

						{ValidationsType.MOBILE_NO === this.props.validatefor && (
							<div>{ValidationMessage.MOBILE_NO}</div>
						)}

						{ValidationsType.COMPULSORY === this.props.validatefor && (
							<div>{ValidationMessage.COMPULSORY}</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default InputComponent;
