import React from 'react';
import spiderman from '../../assets/spiderman.jpg'
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src={spiderman} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Link to='/register' className="btn btn-primary">Create Account</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;