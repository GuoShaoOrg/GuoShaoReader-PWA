import { useEffect, useState, useRef } from "react";


function useCallbackState(initData) {
    const cbRef = useRef();
    const [data, setData] = useState(initData);

    useEffect(() => {
        cbRef.current && cbRef.current(data);
    }, [data]);

    return [data, function (d, callback) {
        cbRef.current = callback;
        setData(d);
    }];
}

export { useCallbackState };