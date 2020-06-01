import React, { Component } from 'react';

class ErrorPage extends Component {
	state = {
		hasError: false
	};

	static getDerivedStateFromError(error: any) {
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1 style={{ textAlign: 'center' }}>Something went wrong.</h1>;
		}
		return this.props.children;
	}
}

export default ErrorPage;
