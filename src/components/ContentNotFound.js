import React from 'react';
import {Link} from 'react-router-dom';

const ContentNotFound = () => {

    return (
        <div className="text-center p-4">
            <h4>404 Page not found.</h4>
            <p className="my-4"><a href="/"><i className="fa fa-arrow-left"></i>&emsp;Back to Game</a></p>
        </div>
    );

};

export default ContentNotFound;