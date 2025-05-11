import { useThemeContext } from '../Context/ThemeContext';
import PropTypes from "prop-types";

// Provides theme for compoents outside of layout, such as <Error /> and <LoadingIcon />
export default function ThemeWrapper({ children }) {
    const {theme} = useThemeContext();

    return (
        <div className={`relative h-screen w-screen ${(theme === 'dark') ? 'dark' : 'light'}`}>
            {children}
        </div>
    );
}

// Prop validation
ThemeWrapper.propTypes = {
    children: PropTypes.node.isRequired
};