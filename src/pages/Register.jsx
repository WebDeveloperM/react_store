import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    let navigate = useNavigate()


    const register = event => {
        event.preventDefault()

        if (password === password2) {
            axios.post('http://localhost:1337/api/users',
                { username, email, password, confirmed: true, role: 1 })
                .then(() => navigate('/login'))
                .catch(err => console.log(err))
        } else {
            throw Error('Passwords do not match')
        }
    }


    return (
        <div className='section is-medium'>
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-5">
                        <div className="box has-background-info-light">
                            <div className="title has-text-centered">Register</div>
                            <form className='form' onSubmit={event => register(event)} >
                                <div className="field">
                                    <input
                                        type="text"
                                        id='username'
                                        className='input'
                                        onInput={event => setUsername(event.target.value)}
                                        value={username}
                                        placeholder='Enter username'
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        type="email"
                                        id='email'
                                        className='input'
                                        onInput={event => setEmail(event.target.value)}
                                        value={email}
                                        placeholder='Enter email'
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        type="password"
                                        id='password'
                                        className='input'
                                        onInput={event => setPassword(event.target.value)}
                                        value={password}
                                        placeholder='Enter password'
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        type="password"
                                        id='passwordConfirm'
                                        className='input'
                                        onInput={event => setPassword2(event.target.value)}
                                        value={password2}
                                        placeholder='Confirm password'
                                    />
                                </div>
                                <button
                                    className="button is-fullwidth is-info my-2"
                                    type='submit'>
                                    Submit
                                </button>
                            </form>
                            <div className="subtitle is-5 has-text-centered has-text-grey-light mt-4">
                                <p>Already have an account?</p>
                                <Link to={'/login'} className='button is-ghost'>
                                    Move to login page
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}