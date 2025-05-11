import { NavLink } from "react-router-dom";

// An general error page that gives you the option to go back to home page
export default function Error() {
    return (
        <main className="absolute w-full h-full inset-0 flex flex-col justify-center items-center bg-bg-primary-light dark:bg-bg-primary-dark">
            <p className="text-center text-xl text-text-primary-light dark:text-text-primary-dark">
                Looks like there was an error. Let&apos;s get you back&nbsp;
                <NavLink to={'/'} className={"animate-link text-xl text-link"}>Home</NavLink>
            </p>
            <img src="/assets/error-animation.gif" alt="" className="grow-0 aspect-square w-32" />
        </main>
    );
}