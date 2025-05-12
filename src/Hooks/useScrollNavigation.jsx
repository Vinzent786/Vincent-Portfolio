import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

// Custom hook for handling scroll based navigation
function useScrollNavigation() {
    const navigate = useNavigate();

    // Memoized function that hook returns to perform scroll based navigation logic
    const scrollNavigation = useCallback((content, scrollEvent) => {
        if (!content) return;
        
        // Current section of page extracted from location
        const currentLocation = location.pathname.split('/')[2];
        // Destructures component ref into position information for the component in page
        const {scrollTop, scrollHeight, clientHeight} = content;
        // Whether the page was scrolled up or down
        const scrollDirection = (scrollEvent.deltaY > 0) ? 'down' : 'up';
        // Object that has two properties, whether the current component is at top/bottom of screen
        const contentPosition = {
            atTop: (scrollTop === 0),
            atBottom: (scrollTop + clientHeight >= scrollHeight)
        };

        // No navigation until component is either at top or bottom of page
        if (!contentPosition.atTop && !contentPosition.atBottom) return;

        // Navigation logic
        switch (currentLocation) {
            case 'about':
                if (
                    contentPosition.atTop && 
                    scrollDirection === 'up'
                ) navigate('/');

                if (
                    contentPosition.atBottom && 
                    scrollDirection === 'down'
                ) navigate('/main/exp');

                break;
            case 'exp':
                if (
                    contentPosition.atTop && 
                    scrollDirection === 'up'
                ) navigate('/main/about');

                if (
                    contentPosition.atBottom && 
                    scrollDirection === 'down'
                ) navigate('/main/skills');

                break;
            case 'skills':
                if (
                    contentPosition.atTop && 
                    scrollDirection === 'up'
                ) navigate('/main/exp');

                break;
            default:
                navigate('/error');
                break;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return scrollNavigation;
}

export { useScrollNavigation };