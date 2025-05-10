import { useRef } from 'react';
import { useThemeContext } from '../Context/ThemeContext';
import icon from '/assets/DayNightIcon.svg';

// Theme switcher component
// Switches application theme between light and dark
export default function DayNightIcon() {
    const {theme, setTheme} = useThemeContext();
    const changeIcon = useRef(null);

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
                top-2
                right-2
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