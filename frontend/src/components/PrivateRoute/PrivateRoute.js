import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


const PrivateRoute = ({ component: Component, auth: { isAuthenticated, isLoading }, ...rest }) => (
    <Route
        {...rest}
        render={props => !isAuthenticated? (<Redirect to="login" />) 
        : (<Component {...props} />)}
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};


const mapStateProps = state =>({
    auth: state.auth
})

export default connect(mapStateProps)(PrivateRoute)
