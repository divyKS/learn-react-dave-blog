import axios from "axios";
import { useState, useEffect } from "react";

function useAxiosFetch(dataURL){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source();

        const getData = async () => {
            try{
                setIsLoading(true);
                const response = await axios.get(dataURL, {
                    cancelToken : source.token
                });
                if(isMounted){
                    setData(response.data);
                    setFetchError(null);
                }
            }
            catch (e) {
                if(isMounted){
                    setData([]);
                    setFetchError(e.message);
                }
            }
            finally{
                if(isMounted){
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 2000);
                }
            }
        };

        getData();

        const cleanUp = () => {
            if(isMounted){
                isMounted = false;
                source.cancel();
            }
        };

        return cleanUp;
    }, [dataURL]);

    return {data, isLoading, fetchError};
}

export default useAxiosFetch;