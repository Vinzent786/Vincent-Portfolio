import { createContext, useContext } from "react";

const 
    ThemeContext = createContext(),
    useThemeContext = () => useContext(ThemeContext);

export {
    ThemeContext,
    useThemeContext
};