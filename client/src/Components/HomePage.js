import React from 'react';
import AuthApi from '../AuthApi';

import {
    Link,
    Redirect
} from "react-router-dom";


function HomePage() {

    const Auth = React.useContext(AuthApi);

    if (localStorage.getItem("user")) {
        return (
            <>
                <Redirect to="/main" />
            </>
        )
    }


    const onLogin = () => {


        Auth.setAuth(true);

        localStorage.setItem("user", JSON.stringify([{ name: "yashpal" }]));

    }

    return (
        <div>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
                    <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                        <div className="flex items-center justify-between w-full md:w-auto">
                            <a href="/" aria-label="Home">
                                <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Logo" />
                            </a>
                            <div className="-mr-2 flex items-center md:hidden">
                                <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" id="main-menu" aria-label="Main menu" aria-haspopup="true">
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block md:ml-10 md:pr-4">
                        <a href="/" className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Product</a>
                        <a href="/" className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Features</a>
                        <a href="/" className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Marketplace</a>
                        <a href="/" className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Company</a>
                        <Link to="/main" className="ml-8 font-medium text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out" onClick={onLogin}>Log In</Link>
                    </div>
                </nav>
            </div>

        </div>
    )

}

export default HomePage;

