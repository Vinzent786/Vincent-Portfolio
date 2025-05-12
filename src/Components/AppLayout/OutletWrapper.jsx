import { useLocation, useOutlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

// Wrapper component that handles animating transitions between page components
// It sets the page component ref so that the parent Layout component has access to it
// It persists the current page component so it can animate out before rendering next page component
export default function OutletWrapper({contentRef}) {
    // Next page component to render
    const newOutlet = useOutlet();
    // Keeps prev component to persist through animation; First render uses incoming outlet child
    const [prevOutlet, setPrevOutlet] = useState(newOutlet);
    // Tracks new location to set as prev location after animation
    const newLocation  = useLocation();
    // Tracks prev location for checking if next location is different from prev location
    const [prevLocation, setPrevLocation] = useState(newLocation);
    // Controlls the state for the fade out animation
    const [transitionOut, setTransitionOut] = useState(false);
    // Fading keyframes' duration in ms
    const fadeDuration = 150;
    // Used for updating the contentRef prop
    const sectionRef = useRef(null), divRef = useRef(null);

    // Updates contentRef
    useEffect(() => {
        if (!sectionRef.current || !divRef.current) return;

        contentRef.current.section = sectionRef.current;
        contentRef.current.div = divRef.current;
    }, [contentRef, sectionRef, divRef]);


    // Handles updating states when the URL changes
    useEffect(() => {
        if (newLocation.pathname === prevLocation.pathname) return;

        //  Cancels any ongoing animations 
        setTransitionOut(false);

        // Starts this process next cycle so that canceling the animation can finish
        setTimeout(() => {
            setTransitionOut(true); // Clears out any running animation
            setPrevLocation(newLocation); // Updates previous location with new location
    
            // Waits for fade out animation to finish before setting transition state to false
            const timer = setTimeout(() => {
                setPrevOutlet(newOutlet); // Updates previous outlet with new outlet
                setTransitionOut(false);
            }, fadeDuration);
    
            return () => clearTimeout(timer);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newLocation.pathname]);

    // Scrolls content back to top of container
    useEffect(() => {
        if (!contentRef.current) return;

        contentRef.current.scrollTop = 0;
    }, [contentRef, prevLocation]);

    return (
        <section ref={sectionRef}
            className="
                h-full
                w-full
                flex
                items-center
                justify-center
        ">
            <div ref={divRef} 
                 className={`
                     font-josefinSans
                     px-7 py-6
                     max-h-screen
                     w-full
                     box-border
                     overflow-y-auto
                     md-max:pt-24
                     ${
                         (transitionOut) 
                             ? 'animate-fade-out-right motion-reduce:animate-fade-out-reduce' 
                             : 'animate-fade-in-right motion-reduce:animate-fade-in-reduce'
                     }
                 `}
            >
                <div className="flex justify-center items-center m-auto">
                    {prevOutlet}
                </div>
            </div>
        </section>
    );
}

// Prop validation
OutletWrapper.propTypes = {
    contentRef: PropTypes.shape({current: PropTypes.any}).isRequired
};









