import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useThemeContext } from "../../Context/ThemeContext.js";
import { useScrollNavigation } from "../../Hooks/useScrollNavigation.jsx";
import Nav from "./Nav.jsx";
import OutletWrapper from "./OutletWrapper.jsx";
import DayNightIcon from '../DayNightIcon.jsx';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const {theme} = useThemeContext();

    // Reference passed to wrapper
    // Wrapper sets current property
    const contentRef = useRef(null);

    // Custom hook for scroll navigation, returns a callback function that performs the logic
    // Callback takes in current page component and wheel event
    const positionInfo = useScrollNavigation();

    // If for some reason the URL path is just "main" or "main/"", navigate to "/main/about"
    // so that a page component can render
    useEffect(() => {
        const pathArr = location.pathname.split('/');
        const lastPath = pathArr[pathArr.length - 1];

        if (!lastPath || lastPath === 'main') navigate('/main/about');
    }, [location, navigate]);

    useEffect(() => {
        if (!contentRef.current) return;

        // Uses custom hook on wheel event 
        const handleScroll = e => {
            // Ignore scrolls on mobile or if zooming in/out
            if (window.innerWidth <= 768 || e.ctrlKey) return;
            positionInfo(contentRef.current, e);
        }
        window.addEventListener('wheel', handleScroll);

        return () => window.removeEventListener('wheel', handleScroll);
    }, [positionInfo, contentRef]);

    return (
        <div className={theme}>
            <DayNightIcon />
            <div id="layout" className="
                flex 
                overflow-x-hidden 
                mx-autoW
                h-screen
                dark:bg-bg-primary-dark
            ">
                <Nav />
                <OutletWrapper contentRef={contentRef} />
            </div>
        </div>
    );
}