import React, { Component } from 'react'

import { AuthContext } from '../context/index'

export default class Private extends Component {

    render() {
        return (
            <div>
                <h1>Private page.</h1>
            </div>
        )
    }
}

Private.contextType = AuthContext;