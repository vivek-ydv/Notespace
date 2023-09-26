import { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
    // set initial state of alert to null
    const [alert, setAlert] = useState(null);

    // show alert message for given time and then reset alert state to null
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        });
        setTimeout(() => {
            setAlert(null);
        }, 10000);
    };

    return (
        // set up the alert context provider with alert state and showAlert function
        <AlertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
