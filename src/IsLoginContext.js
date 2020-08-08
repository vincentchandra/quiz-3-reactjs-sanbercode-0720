import React, {useState, createContext} from 'react';

export const IsLoginContext = createContext()
export const IsLoginProvider = props => {
    const [isLogin, setIsLogin]  =  useState(true)
    return(
        <IsLoginContext.Provider value = {[isLogin,setIsLogin]}>
            {props.children}
        </IsLoginContext.Provider>
    );
};

export default IsLoginContext