import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import React from 'react'

import { setUser } from '../../store/auth/auth.action'
import useUserContext from '../../hooks/useUserContext'

import './Auth.css'
import { Redirect } from 'react-router-dom';

function Auth() {

    var { isLoggedIn, dispatch } = useUserContext();

    function onSubmit(data) {
        axios.post('http://localhost:5000/auth/signin', data)
            .then(response => {
                var userData = response.data
                localStorage.setItem('token', userData.token);
                dispatch(setUser(userData.decodedToken));
            })
    }


    if (isLoggedIn) return <Redirect to="/message" />

    return (
        <div className="Auth container-fluid">
            <div className="Auth_row row">
                <div className="col-md-7 text-center">
                    <p className="title">LogIn</p>
                </div>
                <div className="col-md-5">
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        onSubmit={onSubmit}
                    >
                        <Form className="Auth_form">
                            <Field type="text" className="form-control m-4" name="username"></Field>
                            <Field type="password" className="form-control m-4" name="password"></Field>
                            <button type="submit" className="btn btn-primary m-4">Login</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Auth
