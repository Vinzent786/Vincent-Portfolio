import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import PropTypes from "prop-types";

// Provides theme context to children components
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

// Prop validation
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export {ThemeProvider};
