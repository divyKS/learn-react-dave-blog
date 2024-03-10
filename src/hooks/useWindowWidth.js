import { useState, useEffect } from "react";

function useWindowWidthCalculator(){
    const [windowDimensions, setWindowDimensions] = useState({
        width: undefined, 
        height: undefined
    })

    useEffect(()=>{

        const calcDimensions = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        };
        
        calcDimensions(); // this so that for the first time we have some value, otherwise without resizing it wont be calculated
        
        window.addEventListener("resize", calcDimensions);

        const cleanUp = () => {
            window.removeEventListener("resize", calcDimensions);
            console.log("The resize even listener from window object has been removed");
        };
        
        return cleanUp;

    }, [])

    return windowDimensions;
}

export default useWindowWidthCalculator;