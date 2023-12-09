import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const notify = () => {
        toast.warn("Email yoki parol noto'g'ri", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const signIn = event => {
        event.preventDefault()

        axios.post('http://localhost:1337/api/auth/local', {
            identifier: username,
            password,
        })
            .then(res => {
                console.log(res);
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem('token', JSON.stringify(res.data.jwt))
                notify()
                navigate('/')

            })
            .catch(err => console.error((err)))
    }



    return (
        <div className='section is-medium'>
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-5">
                        <div className="box has-background-info-light">
                            <div className="title has-text-centered">Login</div>

                            <form className='form' onSubmit={event => signIn(event)}>
                                <label htmlFor="name" className='label'>Enter username</label>
                                <input
                                    type="text"
                                    className='input'
                                    onInput={event => setUsername(event.target.value)}
                                    value={username}
                                    id='name' />
                                <label htmlFor="password" className='label'>Enter password</label>
                                <input
                                    type="password"
                                    className='input'
                                    onInput={event => setPassword(event.target.value)}
                                    value={password}
                                    id='password' />
                                <button
                                    className="button is-fullwidth is-info my-2"
                                    type='submit'>
                                    Submit
                                </button>
                            </form>
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                            <ToastContainer />

                            <div className="subtitle is-5 has-text-centered has-text-grey-light mt-4">
                                <p>Don't have an account?</p>
                                <Link to='/register' className='button is-ghost'>
                                    Move to register page
                                </Link>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
