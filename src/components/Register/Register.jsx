import React, { useState } from 'react';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import app from '../../../firebase.config';

const auth = getAuth(app);

const Register = () => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');



    const handleUserSignUp = (event) => {
        event.preventDefault();
        // setErrorMessage('');
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}/.test(password)) {
            setErrorMessage('Password should contain at least 1 uppercase, lowercase, special character, digit and length must be 8 to 20.');
            return setTimeout(() => setErrorMessage(''), 4000);
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccessMessage('You are successfully registered.');
                setTimeout(() => setSuccessMessage(''), 4000);
                event.target.reset(); // after clicking the submit btn, input fields will be empty
                sendVerificationEmail(user)
            })
            .catch(error => {
                const errorMsg = error.message;
                setErrorMessage(errorMsg);
                setTimeout(() => setErrorMessage(''), 4000);
                event.target.reset(); // after clicking the submit btn, input fields will be empty
            }
            );



    }

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
    }

    return (
        <div className="hero min-h-screen bg-base-200 relative">
            {errorMessage && <div className="alert alert-warning z-10 absolute top-10 w-1/3">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{errorMessage}</span>
            </div>}
            {successMessage && <div className="alert alert-success z-10 absolute top-10 w-1/3">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{successMessage}</span>
            </div>}
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register Your Self</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 justify-center w-full max-w-md shadow-2xl bg-base-100">
                    <h1 className="text-3xl font-bold mt-6 ml-8">Create Account</h1>
                    <div className='flex gap-8 my-8 justify-center'>
                        <button className="btn btn-outline text-white w-1/3"><FontAwesomeIcon icon={faGoogle} />Google</button>
                        <button className="btn btn-outline text-white w-1/3"><FontAwesomeIcon icon={faGithub} />GitHub</button>
                    </div>
                    <div className='flex justify-center items-center gap-4 rounded-md'>
                        <div className='h-1 w-1/3 bg-slate-700' />
                        <p className='text-lg'>or</p>
                        <div className='h-1 w-1/3 bg-slate-700' />
                    </div>
                    <form onSubmit={handleUserSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <div className='my-3'>
                            <p>Already registered? <Link to='/login' className='text-indigo-500 hover:font-bold'>Log In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;