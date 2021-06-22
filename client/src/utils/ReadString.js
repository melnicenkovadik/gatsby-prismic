import React, {useEffect, useState} from "react";

const ReadString = (props) => {
    const [dataKey, setDataKey] = useState(null)

    useEffect(() => {
        const {drizzle} = props;
        const contract = drizzle.contracts.MyStringStore;
        setDataKey(contract.methods["myString"].cacheCall())
    }, []);
    // get the contract state from drizzleState
    const {MyStringStore} = props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myString = MyStringStore.myString[dataKey];

    // if it exists, then we display its value
    return <p>My stored string: {myString && myString.value}</p>;
}

export default ReadString;
