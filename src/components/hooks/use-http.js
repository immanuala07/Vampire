import { useCallback, useState } from "react";


// Custom hooks are outsourcing stateful logic into reusable functions.
// By removing the parameters to the custom hook function ( useHttp() ) we can avoid addding dependencies to the useEffect hook
const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /*
    The React useCallback Hook returns a memoized callback function.
    This allows us to isolate resource intensive functions so that they will not automatically run on every render.
    The useCallback Hook only runs when one of its dependencies update.
    This can improve performance.
    */
    const sendRequest = useCallback(
        // By adding the parameters to the async function we can avoid addding dependencies to the useEffect hook
        async (requestConfig, applyData) => {
            setIsLoading(true);
            setError(null);
            try {
                // The below fetch api function is able to work with both POST and GET request types
                const response = await fetch(requestConfig.url, {
                    method: requestConfig.method ? requestConfig.method : 'GET',
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
                });

                if (!response.ok) {
                    throw new Error('Request failed!');
                }

                const data = await response.json();
                applyData(data);
            } catch (err) {
                setError(err.message || 'Something went wrong!');
            }
            setIsLoading(false);
        }, []);

    // return {
    //     isLoading: isLoading,
    //     error: error,
    //     sendRequest: sendRequest
    // };
    // Below object is the ES6 shortcut for the above object.
    return {
        isLoading,
        error,
        sendRequest
    };
};

export default useHttp;
