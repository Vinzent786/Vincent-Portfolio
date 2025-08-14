import { useState, useEffect } from "react";
import LoadingIcon from "../LoadingIcon";

// The "Experience" section of page
export default function Exp() {
    // Used to set mounting state
    const [mounted, setMounted] = useState(false);
    
    // Helps avoid transitioning in component before it is fully mounted
    useEffect(() => setMounted(true), []);

    // Return loading component if not mounted
    if (!mounted) return (<LoadingIcon />);

    return (
        <div id="exp-container" className="my-auto w-full px-8 sm-max:p-4">
            <div className="flex flex-col gap-4 w-fit m-auto">
                <div>
                    <h1>Experience</h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        {(window.innerWidth > 640) ? 'Hover' : 'Tap'} to reveal
                    </p>
                </div>
                <div id="exp-container" 
                    className="
                        grid 
                        gap-y-6 auto-rows-fr grid-cols-1
                        xl:grid-rows-2 xl:grid-cols-2 xl:gap-x-6
                        xl:justify-center
                        text-text-primary-light
                        dark:text-text-primary-dark
                        sm-max:w-full
                    "
                >
                    <article>
                        <div></div>
                        <h2>Frontend Development</h2>
                        <ul className="
                            h-full
                            sm-max:flex
                            flex-col
                            justify-between
                        ">
                            <li>Experienced in building dynamic SPA user interfaces using React.</li>
                            <li>Utilize React hooks and APIs.</li>
                            <li>Expertise in HTML5, CSS3, and JavaScript.</li>
                            <li>Tailwind CSS for rapid UI development.</li>
                            <li>Building custom web-components for developers to use across large-scale projects.</li>
                        </ul>
                    </article>
                    <article>
                        <div></div>
                        <h2>Full-Stack Development</h2>
                        <ul className="
                            h-full
                            sm-max:flex
                            flex-col
                            justify-between
                        ">
                            <li>Extensive experience with PHP for server-side logic and RESTful APIs.</li>
                            <li>Next.js with TypeScript for building full-stack web applications.</li>
                            <li>Node.js for server-side development.</li>
                            <li>Relational database management using SQL.</li>
                            <li>Integration of third-party APIs for complex functionalities.</li>
                            <li>End-to-end development from design to production.</li>
                            <li>Successfully deployed multiple internal projects.</li>
                            <li>Vite for web-bundling.</li>
                        </ul>
                    </article>
                    <article>
                        <div></div>
                        <h2>System Administration</h2>
                        <ul className="
                            h-full
                            sm-max:flex
                            flex-col
                            justify-between
                        ">
                            <li>Experienced in PowerShell scripting for system administration tasks.</li>
                            <li>Comfortable in Linux Environments for development and deployment.</li>
                            <li>Utilized Git and SVN for version control and collaborative development workflows.</li>
                            <li>Configuring networking hardware from Cisco, Nomadix, Brocade, Ruckus, and Motorola.</li>
                            <li>Experience in IPv4 Subnetting.</li>
                            <li>Securing Cisco hardware with SSH access and user role management.</li>
                            <li>Set up VLANs, DHCP pools, and switch configurations for LAN environments.</li>
                        </ul>
                    </article>
                </div>
                <div className="text-text-secondary-light dark:text-text-secondary-dark flex flex-col gap-2">
                    <p>
                        View my full resume&nbsp;
                        <a className="animate-link" href="/assets/Vincent Cook Resume.pdf" target="_blank">
                            Here
                        </a>.
                    </p>
                    <p>
                        View the code for this portfolio&nbsp;
                        <a className="animate-link" href="https://github.com/Vinzent786/Vincent-Portfolio" target="_blank">
                            Here
                        </a>.
                    </p>
                </div>
            </div>
        </div>
    );
}