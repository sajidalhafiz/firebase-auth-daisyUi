import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from '../../../firebase.config';
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const auth = getAuth(app);

const Login = () => {

    const emailRef = useRef();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => console.log(result.user))
            .catch(error => console.log(error))
    }

    const githubProvider = new GithubAuthProvider();

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => console.log(result.user))
            .catch(error => console.log(error))
    }

    //== input value handling ==//
    //1: for every changes it will trigger and give the new value
    // const handleOnChange = (event) => {
    //     console.log(event.target.value)
    // }

    //2: if click outside the field it will give a value
    // const handleOnBlur = (event) => {
    //     console.log(event.target.value)
    // }

    //3: event.preventDefault() -> prevents reloading the page
    //   to get each field value we call by field name. here email and password
    const handleOnSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        emailRef.current = email;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(`👋 Welcome Back ${user.email} You are successfully Logged In.`);
                setTimeout(() => setSuccess(''), 4000);
                event.target.reset();
            })
            .catch(error => {
                setError(`${error.message}`);
                setTimeout(() => setError(''), 4000);
                event.target.reset();
                console.error(error)
            })
    }

    const handlePasswordReset = () => {
        const email = emailRef.current.value;
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('email is sent')
        })
        .catch(error => {
            console.error(error)
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200 relative">
            {error && <div className="alert alert-warning z-10 absolute top-10 w-1/3">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{error}</span>
            </div>}
            {success && <div className="alert alert-success z-10 absolute top-10 w-1/3">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{success}</span>
            </div>}
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 justify-center w-full max-w-md shadow-2xl bg-base-100">
                    <h1 className="text-3xl font-bold mt-6 ml-8">Choose</h1>
                    <div className='flex gap-8 my-8 justify-center'>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline text-white w-1/3"><FontAwesomeIcon icon={faGoogle} />Google</button>
                        <button onClick={handleGithubSignIn} className="btn btn-outline text-white w-1/3"><FontAwesomeIcon icon={faGithub} />GitHub</button>
                    </div>
                    <div className='flex justify-center items-center gap-4 rounded-md'>
                        <div className='h-1 w-1/3 bg-slate-700' />
                        <p className='text-lg'>or</p>
                        <div className='h-1 w-1/3 bg-slate-700' />
                    </div>
                    <form onSubmit={handleOnSubmit} className="card-body">
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
                            <label className="label">
                                <button onClick={() => document.getElementById('my_modal_1').showModal()} className="label-text-alt link link-hover">Forgot password?</button>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className='my-3'>
                            <p>Don't have an account? <Link to='/register' className='text-indigo-500 hover:font-bold'>Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box space-y-4">
                    <div className='modal-top'>
                        <h3 className="font-bold text-lg">Please send your email to reset password</h3>
                    </div>
                    <div className="modal-action modal-middle block">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input ref={emailRef} name='email' type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <button className="btn">Close</button>
                        </form>
                    </div>
                    <div className='modal-bottom text-end'>
                        <button onClick={handlePasswordReset} className="btn btn-primary">Send</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Login;