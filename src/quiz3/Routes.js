import React,{useState, useContext} from 'react';

import {IsLoginContext} from '../IsLoginContext'
import Logo from './public/img/logo.png'
import Login from './Login'
import MovieListEditor from './MovieListEditor'
import './public/css/style.css'

import {
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './Home'
import About from './About'
const Routes = () => {
    const [isLogin, setIsLogin] = useContext(IsLoginContext)
    return(
        <>
        <header>
            <img id="logo" src={Logo} width="200px" alt="logo" />
            <nav> 
                <ul>
                <li><Link to="/">Home </Link> </li>
                <li><Link to="/about">About </Link> </li>
                {
                    isLogin == true &&(
                        <li><Link to="/list">Movie List Editor</Link> </li>
                    )
                }
                {
                    isLogin == false && (
                        <li><Link to="/login">Login</Link> </li>
                    )
                }
                </ul>
            </nav>
            </header>
        <Switch>
            <Route path='/about' component={About}/>
            <Route path='/list' component={MovieListEditor}/>
            <Route path='/login' component={Login}/>
            <Route path='/' component={Home}/>
        </Switch>
        </>
    )
}

export default Routes;