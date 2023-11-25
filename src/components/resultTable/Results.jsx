import { Table } from "antd";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

export const ResultsTable = () => {
  const { currentCode, fetchSQLData } = useAppContext();

  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentCode !== '--Write query here') {      
      const fetchDataAndSetState = async () => {
        try {
          const { resultData, totalRowsInTable } = await fetchSQLData(currentCode);
          setData(resultData);
          setTotalRows(totalRowsInTable);
          // console.log(resultData);
        } catch (error) {
          console.error(error);
        }
      }
      fetchDataAndSetState();
    }
  }, [currentCode]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data;

  // Assuming the first row in the CSV contains headers
  const columns = data.length > 0 ? data[0].map((header) => ({ dataIndex: header, title: header })) : [];


  return (
    <Table
      dataSource={paginatedData.slice(1).map((row, rowIndex) => {
        // Mapped each row to an object with keys based on header names
        const rowData = {};
        row.forEach((value, columnIndex) => {
          rowData[data[0][columnIndex]] = value;
        });
        return { ...rowData, key: rowIndex }; // Add a unique key to each row
      })}
      columns={columns}
      pagination={{
        current: currentPage,
        total: totalRows,
        defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'],
        onChange: handlePageChange,
      }}
    />
  );
}