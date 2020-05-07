import React from 'react';
import { AuthConsumer } from '../authContext/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {(context) => (
      <>
        {/* {console.log(context)} */}
        <Route
          render={(props) =>
            context.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
          }
          {...rest}
        />
      </>
    )}
  </AuthConsumer>
);

export default ProtectedRoute;
