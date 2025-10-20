"use client"

import React, {useState} from 'react';
import { stateContext } from './StateContext';
import {user} from "@/context/Types";

const Provider = ({children}:{children:React.ReactNode}) => {

    const [chat, setChat] = useState<Record<string, user>>({});
    const [activeChat, setActiveChat] = useState<string | null>(null);
    const [username, setUsername] = useState("");

    return (
        <stateContext.Provider value={{ chat, setChat, activeChat, setActiveChat, username, setUsername }}>
            {children}
        </stateContext.Provider>
    );
};

export default Provider;