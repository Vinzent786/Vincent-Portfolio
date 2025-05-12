import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { primaryInput } from "detect-it";
import { useThemeContext } from "../../Context/ThemeContext.js";
import { useScrollNavigation } from "../../Hooks/useScrollNavigation.js";
import Nav from "./Nav.jsx";
import OutletWrapper from "./OutletWrapper.jsx";
import DayNightIcon from '../DayNightIcon.jsx';

// Main layout component for page. Wraps all main page components
export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const {theme} = useThemeContext();
    const locationChangeNow = useRef(performance.now());
    // Reference passed to wrapper. Wrapper sets current property 
    const contentRef = useRef({
        section: null,
        div: null
    });

    // Custom hook for scroll navigation, returns a callback function that performs the logic
    // Callback takes in current page component and wheel event
    const positionInfo = useScrollNavigation();

    // If for some reason the URL path is just "main" or "main/"", navigate to "/main/about"
    // so that a page component can render
    useEffect(() => {
        locationChangeNow.current = performance.now();
        const pathArr = location.pathname.split('/');
        const lastPath = pathArr[pathArr.length - 1];

        if (!lastPath || lastPath === 'main') navigate('/main/about');
    }, [location, navigate]);

    // Handles attatching wheel event function to section element
    useEffect(() => {
            const 
                section = contentRef.current.section,
                div = contentRef.current.div;

            if (!section || !div) return;

            const handleScroll = e => {
                if (e.ctrlKey || primaryInput !== 'mouse') return;
                // console.log(Math.abs(e.deltaY))
                if (
                    performance.now() - locationChangeNow.current < 300
                    || Math.abs(e.deltaY) < 10
                ) return;
                positionInfo(div, e, locationChangeNow.current);
            };

            section.addEventListener('wheel', handleScroll, { passive: false });

            return () => section.removeEventListener('wheel', handleScroll);
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
