import React, {Fragment} from 'react';
import './Spinner.css'

const Spinner = () => {
    return (
        <Fragment>
            <div className="spinner spinner-1">
                <div className="spinner spinner-2">
                    <div className="spinner spinner-3" >
                        <div className="spinner spinner-4">
                            <div className="spinner spinner-5">
                                <div className="spinner spinner-6">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Spinner;