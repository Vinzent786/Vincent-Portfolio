import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Down arrow svg used in navlink to go to next section of page
function DownArrow() {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            className="
                w-12 h-12
                animate-bounce
                motion-reduce:animate-none
                stroke-current
                transition-all duration-200
                hover:cursor-pointer 
                text-text-primary-light
                dark:text-text-primary-dark
                hover:stroke-nav-link-hover-light
                dark:hover:stroke-nav-link-hover-dark
            "
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7" 
            />
        </svg>
    );
}

// Root route of web app
export default function Home() {
    // Used to handle navigating to next section of page via scrolling
    const [scrollDown, setScrollDown] = useState(false);

    useEffect(() => {
        const handleScroll = (e) => {
            // Ignore scroll up or zooming
            if (e.deltaY <= 0 || e.ctrlKey) return;

            setScrollDown(true);
        }

        window.addEventListener('wheel', handleScroll);

        return () => window.removeEventListener('wheel', handleScroll);
    }, []);

    return (
        <div 
            className="
                absolute inset-0 
                bg-[url('/assets/code-cover.webp')] bg-cover bg-center
            "
        >
            <div className="
                    relative 
                    h-full w-full 
                    flex justify-center 
                    bg-opacity-[.96]
                    dark:bg-opacity-[.95]
                    bg-bg-secondary-light
                    dark:bg-black
                "
            >
                <section className="
                        flex flex-col justify-center gap-2 
                        font-josefinSans 
                        max-w-[90%]
                        animate-fade-in
                    "
                >
                    <h1 className="text-6xl font-bold text-text-primary-light dark:text-text-primary-dark">Vincent Cook</h1>
                    <h2 className="text-2xl font-bold pl-2 text-text-secondary-light dark:text-text-secondary-dark">Web Developer</h2>
                    <p className=" text-lg pl-3 text-text-secondary-light dark:text-text-secondary-dark">I am a web developer with full stack experience.</p>
                </section>
                <NavLink to={'/main/about'} className={"absolute bottom-0 animate-fade-in"}>
                    <DownArrow />
                </NavLink>
            </div>
            {
                scrollDown && <Navigate to={'/main/about'} />
            }
        </div>
    );
}