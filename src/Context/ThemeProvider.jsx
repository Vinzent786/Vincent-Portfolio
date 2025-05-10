import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import PropTypes from "prop-types";

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const themeContext = useMemo(() => {
        return {theme, setTheme};
    }, [theme]);

    return (
        <ThemeContext.Provider value={themeContext}>
            {children}
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export {ThemeProvider};
