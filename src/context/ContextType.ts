import {user} from "@/context/Types";
import React from "react";

export interface SetContextType{
    chat:user;
    setChat:(React.Dispatch<React.SetStateAction<user>>);
}