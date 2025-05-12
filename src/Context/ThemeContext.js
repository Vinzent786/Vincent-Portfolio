import { createContext, useContext } from "react";

const 
    ThemeContext = createContext(),
    useThemeContext = () => useContext(ThemeContext);

    // Exports the themeContent and the ability to use the theme context
export {
    ThemeContext,
    useThemeContext
};