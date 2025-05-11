import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
                stroke-current text-[#fff]
                transition-all duration-200
                hover:cursor-pointer 
                hover:stroke-nav-link-hover-dark
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

export default function Home() {
    const [scrollDown, setScrollDown] = useState(false);

    useEffect(() => {
        const handleScroll = (e) => {
            if (e.deltaY <= 0) return;

            setScrollDown(true);
        }

        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
        }
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
                    bg-black bg-opacity-[.97]
                "
            >
                <section className="
                        flex flex-col justify-center gap-2 
                        font-josefinSans 
                        max-w-[90%]
                        animate-fade-in
                    "
                >
                    <h1 className="text-6xl font-bold text-text-primary-dark">Vincent Cook</h1>
                    <h2 className="text-2xl font-bold pl-2 text-text-secondary-dark">Web Developer</h2>
                    <p className=" text-lg pl-3 text-text-secondary-dark">
                        I am a web developer with full stack experience.
                    </p>
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