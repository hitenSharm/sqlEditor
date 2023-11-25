import { createContext, useCallback, useContext, useState } from "react";
import { fetchCsvData } from "../utils";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [allQueries, setAllQueries] = useState([
        {
            queryCode: "SELECT * FROM orders",
            queryDesc: "Shows all orders table data here.",
        },
        {
            queryCode: "SELECT * FROM customers",
            queryDesc: "Lorem Ipsum",
        },
        {
            queryCode: "SELECT * FROM categories",
            queryDesc: "Lorem Ipsum",
        },
        {
            queryCode: "SELECT * FROM products",
            queryDesc: "Lorem Ipsum",
        },
        {
            queryCode: "SELECT * FROM suppliers",
            queryDesc: "Lorem Ipsum",
        },
        {
            queryCode: "SELECT * FROM shippers",
            queryDesc: "Lorem Ipsum",
        },
    ]);

    const fetchSQLData = useCallback(async (queryCode) => {
        let tableName = queryCode.split(' ');
        let [resultData, resultRowsLength] = await fetchCsvData(`${tableName[tableName.length - 1]}.csv`);
        const data = { resultData, totalRowsInTable: resultRowsLength };
        return data;
    }, []);

    const addNewQuery = (values) => {
        const updateQueries = [...allQueries, {
            queryCode: values.code,
            queryDesc: values.description
        }];
        setAllQueries(updateQueries);
    }

    const [currentCode, setCurrentCode] = useState("--Write query here");

    const executeQuery = (query) => {
        setCurrentCode(query);
    }

    return (
        <AppContext.Provider
            value={{ allQueries, addNewQuery, currentCode, executeQuery, fetchSQLData }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
};