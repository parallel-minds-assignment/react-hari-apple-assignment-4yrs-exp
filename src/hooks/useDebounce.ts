import { useRef, useEffect, useCallback } from 'react';

export const useDebounce = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
    const timeoutRef = useRef<number | null>(null);

    const debouncedFunction = useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return debouncedFunction;
};
