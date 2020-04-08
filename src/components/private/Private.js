  
import React, { Component } from 'react';

import  { AuthContext }  from '../authContext/AuthContext';
export default class Private extends Component {

  render() {
     console.log('++++++++++++++++> ', this.context.state);

    const { username } = this.context.state.currentUser;
    return (
      <>
        <h3>A very private page!</h3>
        <h2>User in the session is: {username}</h2>
      </>
    );
  }
}

Private.contextType = AuthContext;