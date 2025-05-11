
import { useEffect, useState } from 'react';

export function useWidth(width: number) {
    const [isWidth, setIsWidth] = useState(false);

    useEffect(() => {
        const checkViewport = () => {
            setIsWidth(window.innerWidth < width);
        };

        checkViewport();
        window.addEventListener('resize', checkViewport);

        return () => window.removeEventListener('resize', checkViewport);
    }, []);

    return { isWidth };
}