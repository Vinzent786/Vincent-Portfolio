import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import PropTypes from "prop-types";

// Provides theme context to children components
function ThemeProvider({ children }) {
    // Tries to retrieve theme from local storage, if not found it defaults to dark theme
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    // Sets theme in local storage
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Returns theme state and set theme state, only changes return when theme changes
    const themeContext = useMemo(() => {
        return {theme, setTheme};
    }, [theme]);

    // Provides children with theme state and set theme state
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
