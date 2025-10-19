"use client"

import React, {useState} from 'react';
import { stateContext } from './StateContext';
import {user} from "@/context/Types";

const Provider = ({children}:{children:React.ReactNode}) => {

    const [chat, setChat] = useState<user>({
        id:"",
        room:"",
        selected:false,
        sendMessage:"",
        receivedMessage:"",
    });

    return (
        <stateContext.Provider value={{chat,setChat}}>
            {children}
        </stateContext.Provider>
    );
};

export default Provider;