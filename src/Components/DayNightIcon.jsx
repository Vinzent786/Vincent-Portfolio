import { useRef } from 'react';
import { useThemeContext } from '../Context/ThemeContext';
import icon from '/assets/DayNightIcon.svg';

// Theme switcher component
// Switches application theme between light and dark
export default function DayNightIcon() {
    const {theme, setTheme} = useThemeContext();
    const changeIcon = useRef(null);

    // Handles setting the theme
    const handleClick = () => {
        if (!changeIcon.current) return;
        setTheme((theme === 'dark') ? 'light' : 'dark');
    }

    return (
        <img 
            src={icon} 
            alt="Day/Night Icon" 
            className={`
                aspect-square w-10
                absolute
                top-5
                sm-max:top-2
                sm-max:right-6
                right-10
                z-[9999]
                rounded-full
                transition-all
                rotate-0 dark:rotate-180
                ring-black dark:ring-white
                ring-1
                hover:cursor-pointer
            `}
            ref={changeIcon}
            onClick={handleClick}
        />
    );
}