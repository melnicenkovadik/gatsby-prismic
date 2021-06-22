import {useEffect, useState} from "react";
import ReadString from "./../utils/ReadString";

const DrizzleComponent = (props) => {
    const [loading, setLoading] = useState(true)
    const [drizzleState, setDrizzleState] = useState(null)
    let unsubscribe
    useEffect(() => {
        const {drizzle} = props;
        unsubscribe = drizzle.store.subscribe(() => {
            const drizzleState = drizzle.store.getState();
            if (drizzleState.drizzleStatus.initialized) {
                setLoading(false)
                setDrizzleState({drizzleState: drizzleState})
            }
        });

    }, []);

    useEffect(() => {
        return () => {
            unsubscribe();
        };
    }, []);
    if (loading) return "Loading Drizzle...";

    return (
        <div className="App">
            <ReadString
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
            />
        </div>
    );
}

export default DrizzleComponent;
