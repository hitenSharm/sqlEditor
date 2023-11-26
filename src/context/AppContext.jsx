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

    //implementing LRU cache myself as i was having some trouble

    const [queryCache,setQueryCache]=useState({});
    const maxCacheSize=10;

    const fetchSQLData = useCallback(async (queryCode) => {
        // Check if the data is in the cache
        if (queryCache[queryCode]) {
            // Move the entry to the front of the cache to mark it as most recently used
            console.log("in cache")
            const updatedCache = { [queryCode]: queryCache[queryCode], ...queryCache };
            setQueryCache(updatedCache);
            return updatedCache[queryCode];
        }

        // If not in cache, fetch the data
        let tableName = queryCode.split(' ');
        let [resultData, resultRowsLength] = await fetchCsvData(`${tableName[tableName.length - 1]}.csv`);

        // Store the data in the cache
        const data = { resultData, totalRowsInTable: resultRowsLength };
        const updatedCache = { [queryCode]: data, ...queryCache };

        // Evict the least recently used entry if the cache size exceeds the limit
        if (Object.keys(updatedCache).length > maxCacheSize) {
            const [oldestKey] = Object.keys(updatedCache).splice(-1);
            delete updatedCache[oldestKey];
        }

        setQueryCache(updatedCache);

        return data;
    }, [queryCache, maxCacheSize]);

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