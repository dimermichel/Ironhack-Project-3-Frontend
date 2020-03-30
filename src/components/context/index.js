import React, { Component } from 'react'

import AUTH_SERVICE from '../../services/AuthServices'

export const AuthContext = React.createContext();

export default class AuthProvider extends Component {

    state = {
        formSignup: {
            username: '',
            email: '',
            password: ''
        },
        user: {},
        isLoggedIn: false,
        message: null
    }

    handleSignupInput = e => {
        const {target : {name, value}} = e;
        this.setState(prevState => ({
            ...prevState,
            formSignup: {
                ...prevState.formSignup,
                [name]: value
            }
        }))
        console.log(this.state.formSignup)
    }

    handleSignupSubmit = e => {
        e.preventDefault()
        AUTH_SERVICE.signup(this.state.formSignup)
            .then(response => {
                console.log({response})
            })
            .catch(err => console.log(err))
    }

    handleSignupGithubSubmit = e => {
        e.preventDefault()
        AUTH_SERVICE.signupGithub()
            .then(response => {
                console.log({response})
            })
            .catch(err => console.log(err))
    }

    handleLogout = e => {
        e.preventDefault()
        AUTH_SERVICE.logout()
            .then(response => {
                console.log({response})
            })
            .catch(err => console.log(err))
    }

    render() {
        const { state, handleSignupInput, handleSignupSubmit, handleSignupGithubSubmit,
            handleLogout} = this;
        return (
            <AuthContext.Provider value={{state, handleSignupInput, handleSignupSubmit, handleSignupGithubSubmit,
                handleLogout}}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}
