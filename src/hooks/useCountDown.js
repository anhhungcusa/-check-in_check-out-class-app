const { useState } = require("react");
const { useEffect } = require("react");

function useCountDown(
    {
        start  = 0,
        end = 10,
        skip = 1
    },
    intervalTime = 1000,
    reset
) {
    const [number, setNumber] = useState(end)
    useEffect(() => {
        setNumber(end)
    }, [end, reset])
    useEffect(() => {
        const interval = setInterval(() => {
            setNumber(num => {    
                if(num === start) {
                    return end
                }
                return num - skip
            })
        }, intervalTime)
        return () => {
            clearInterval(interval)
        }
    }, [end, intervalTime, skip, start])

    return number

}

export default  useCountDown