import { useEffect } from "react";

// Used for preloading images. 
// Helps make sure that assets are ready to be used when components are painted
// Takes an array of image sources to preload
function usePreloadImages(imageList) {
    useEffect(() => {
        imageList.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, [imageList]);
}

export { usePreloadImages };