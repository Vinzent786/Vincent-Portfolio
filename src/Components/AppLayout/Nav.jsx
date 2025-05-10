import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Nav bar for portfolio
export default function Nav() {
    const navRef = useRef(null);
    const timeoutRef = useRef(null);
    const location = useLocation();
    const hoverAnimationTime = 200;

    // This hook is used for simulating the hover animation when the NavLink 
    // skips the hover state by rendering as active from the scroll navigation
    useEffect(() => {
        // Clears any ongoing animations
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        // Return if nav hasn't rendered yet
        if (!navRef.current) return;

        // Loops through each nav link and performs logic for simulating the hover animation
        [...navRef.current.querySelector('ul').children]
            .forEach(li => {
                const navLink = li.querySelector('a');

                if (navLink.classList.contains('active')) {
                    navLink.classList.add('animate-hover-trigger');
                    navLink.classList.add('animate-nav-link');

                    timeoutRef.current = setTimeout(() => {
                        navLink.classList.add('active-nav-link');
                        navLink.classList.remove('animate-nav-link');
                        navLink.classList.remove('animate-hover-trigger');
                    }, hoverAnimationTime);
                } else {
                    navLink.classList.remove('active-nav-link');
                    navLink.classList.add('animate-nav-link');
                }
            });
    }, [location]);

    return (
        <div className="
                h-screen
                bg-bg-secondary-light
                dark:bg-bg-secondary-dark
                border-border-light
                dark:border-border-dark
                shadow-nav-shadow-light
                dark:shadow-nav-shadow-dark
                flex items-center
                border-x-2 
                border-l-0
                animate-fade-in
                md-max:border-0 md-max:border-b-2
                md-max:h-fit md-max:w-full
                md-max:absolute md-max:top-0
                md-max:z-[1000]
        ">
            <nav ref={navRef} 
                 className="
                     flex 
                     justify-between 
                     items-center 
                     font-bold
                     text-xl
                     p-6
                     sm-max:text-base
                     sm-max:p-3
            ">
                <ul className="flex gap-2 flex-col md-max:flex-row md-max:gap-4">
                    <li>
                        <NavLink to="/main/about" className={'animate-nav-link'}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/main/exp" className={'animate-nav-link'}>Exp.</NavLink>
                    </li>
                    <li>
                        <NavLink to="/main/skills" className={'animate-nav-link'}>Skills</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}