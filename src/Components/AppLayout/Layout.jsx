import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { primaryInput  } from "detect-it";
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
    // Used for determining how fast scroll based navigation can occur
    const locationChangeNow = useRef(performance.now());
    // Used in handleScroll to to help prevent accidental scrolling into next component
    const lastScrollTime = useRef(0);
    // Reference passed to wrapper. Wrapper sets current properties
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

    // Resets scroll position to top of component that loaded in
    useEffect(() => {
        // Animation frame to make sure the new layout has already been calculated
        requestAnimationFrame(() => {
            const div = contentRef.current.div;
            if (!div) return;
            div.scrollTop = 0;
        });
    }, [location.pathname]);

    // Handles attatching wheel event function to section element
    useEffect(() => {
            const 
                section = contentRef.current.section,
                div = contentRef.current.div;

            if (!section || !div) return;

            // Handles deciding to use scroll based navigation
            const handleScroll = e => {
                // Helps prevent track pads accidently scrolling to next component when scrolling an overflow component
                if (
                    div.scrollHeight > div.clientHeight
                    && div.scrollTop + div.clientHeight >= div.scrollHeight
                    && performance.now() - lastScrollTime.current < 100
                ) return;

                lastScrollTime.current = performance.now();

                // Should not used scroll based naviation if:
                //  - Zooming in/out
                //  - On mobile devices (They should use nav bar)
                //  - Last location change was too recent
                //  - There was small scroll inertia (likely from lifting fingers off a touch pad)
                if (
                    e.ctrlKey
                    || primaryInput !== 'mouse'
                    || performance.now() - locationChangeNow.current < 300
                    || Math.abs(e.deltaY) < 10
                ) return;

                // Uses scroll based navigation hook
                positionInfo(div, e);
            };

            section.addEventListener('wheel', handleScroll, { passive: false });

            return () => section.removeEventListener('wheel', handleScroll);
    }, [positionInfo, contentRef]);

    return (
        <div className={theme}>
            <DayNightIcon />
            <div id="layout" className="
                flex 
                md-max:flex-col
                overflow-x-hidden 
                mx-autoW
                h-screen
                h-[100dvh]
                dark:bg-bg-primary-dark
            ">
                <Nav />
                <OutletWrapper contentRef={contentRef} />
            </div>
        </div>
    );
}
