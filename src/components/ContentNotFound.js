import React from 'react';
import {Link} from 'react-router-dom';

const ContentNotFound = () => {

    return (
        <div className="text-center p-4">
            <h3>404 Page not found.</h3>
            <p className="my-4"><Link to="/"><i className="fa fa-arrow-left"></i>&emsp;Back to Game</Link></p>
        </div>
    );

};

export default ContentNotFound;