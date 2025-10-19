import {SetContextType} from "@/context/ContextType";
import {createContext} from "react";

export const stateContext = createContext<SetContextType | null>(null)