import React from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import pnf from '../assets/images/page_404.svg';

const Error404Page = (props:RouteComponentProps) => {
    return (
        <div className="centerEverything flex-column fullPage">
            <div className="centerEverything mb-5">
				<img src={pnf} style={{ width: '250px', height: '150px' }} alt="myImage" />
			</div>
           <div className="font18">Page not found</div>
            <Link className="text-decoration-underline" to="/home" >Go to home</Link>
        </div>
    );
}

export default withRouter(Error404Page);
