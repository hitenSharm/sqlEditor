import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {    
    const [allQueries, setAllQueries] = useState([
        {
            queryCode: "SELECT * FROM ORDERS",
            queryDesc: "Lorem Ipsum",
        },
        {
            queryCode: "SELECT * FROM TABLES",
            queryDesc: "Lorem Ipsum",
        },
    ]);

    const addNewQuery = (values) => {
        const updateQueries = [...allQueries, {
            queryCode: values.code,
            queryDesc: values.description
        }];
        setAllQueries(updateQueries);
    }

    const [currentCode, setCurrentQuery] = useState("--Write query here");

    const executeQuery = (query) => {
        console.log(query);
        setCurrentQuery(query);
    }

    return (
        <AppContext.Provider
            value={{ allQueries, addNewQuery, currentCode, executeQuery }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
};