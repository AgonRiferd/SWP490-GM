import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {

    return (
        <>
            <h2>Page not Found</h2>
            <NavLink end to="/">
                Back to Home
            </NavLink>
        </>
    )
}

export default PageNotFound;