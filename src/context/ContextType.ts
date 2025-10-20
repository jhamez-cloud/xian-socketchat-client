import {user} from "@/context/Types";
import React from "react";

export interface SetContextType{
    chat: Record<string, user>; // multiple rooms
    setChat: React.Dispatch<React.SetStateAction<Record<string, user>>>;
    activeChat: string | null;
    setActiveChat: React.Dispatch<React.SetStateAction<string | null>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}