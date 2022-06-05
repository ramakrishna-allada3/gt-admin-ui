import React, {useState} from "react";

export const StoreContext = React.createContext();

function StoreProvider(props) {
    const [storeData, setStoreData] = useState({}); 

    return <StoreContext.Provider value={[storeData, setStoreData]}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreProvider;