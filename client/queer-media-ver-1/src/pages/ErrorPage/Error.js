import React from 'react';
import errorImg from '../../assets/images/radar.png';
import './Error.css';

const Error = () => {
    return (
        <div className="container Error">
            <div className="row ">
                <div className="col-12 col-md-6 Error-Img">
                    <img src={errorImg} alt="a radar"/>
                </div>

                <div className="col-12 col-md-6 Error-Des">
                    <h1>404</h1>
                    <h2>Oh No! This place is not Fruity</h2>
                    <p>Sorry, the Gaydar couldn't pickup anything here</p>
                    <button className="btn green">Return Home</button>
                </div>
            </div>
        </div>
    );
}
 
export default Error;