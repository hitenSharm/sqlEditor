
const parseCsv = (csvData) => {
    // Parse CSV data here and return an array of rows
    const rows = csvData.split('\n').map((row) => row.split(','));    
    return rows;
}

export const fetchCsvData = async (filePath) => {
    const csvFile = require(`../csv/${filePath}`);    
    const response = await fetch(csvFile);
    const csvData = await response.text();
    const parsedData = parseCsv(csvData);    
    return [parsedData, parsedData.length];
}