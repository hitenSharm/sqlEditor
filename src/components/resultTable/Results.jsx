import { Button, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { CSVLink } from "react-csv";
import openNotification from "../../utils/notificationUtil";
import CustomToolTip from "../common/CustomToolTip";
import Typography from "antd/es/typography/Typography";
import { DownloadOutlined } from "@ant-design/icons";

export const ResultsTable = () => {
  const { currentCode, fetchSQLData } = useAppContext();

  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentCode !== '--Write query here') {
      //current code represents valid code that will run at all times, so we dont need to worry about infinite
      //renders here.
      const fetchDataAndSetState = async () => {
        try {
          const startTime = performance.now();
          const { resultData, totalRowsInTable } = await fetchSQLData(currentCode);
          const endTime = performance.now();
          setData(resultData);
          setTotalRows(totalRowsInTable);
          const elapsedTime = endTime - startTime; //in ms
          openNotification('success', `Execution time : ${elapsedTime.toFixed(2)}ms`);
          // console.log(resultData);
        } catch (error) {
          openNotification("error", "Some error occured")
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
  const columns =
    data.length > 0
      ? data[0].map((header) => ({
        dataIndex: header,
        title: header,
        ellipsis: true,
        render: (text) => {
          if (text) {
            return (<CustomToolTip title={text} condition={text.length > 15} placement="topLeft">
              <span className=" cursor-pointer">{text}</span>
            </CustomToolTip>)
          } else {
            return;//text can take time to receive so if else
          }
        },
      }))
      : [];

  //for downloading...
  const csvData = paginatedData.map((row) =>
    row.reduce((acc, value, index) => {
      acc[data[0][index]] = value;
      return acc;
    }, {})
  );

  return (
    <>      
      <div className=" p-6 pb-2">
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
          itemRender: (current, type, originalElement) => {
            if (type === 'prev') {
              //for some reason tailwind wasnt working
              return <button style={{color:"white", fontWeight:"bold"}}> {"<"} </button>;
            }
            if (type === 'next') {
              return <button style={{color:"white", fontWeight:"bold"}}> {">"} </button>;
            }            
            return originalElement;
          },
        }}
      />
      </div>
      {data.length > 0 ? <div className="w-full flex justify-end pr-4 mb-8">
        <Button className=" ml-4  bg-greyDark rounded-xl border-0 w-[180px] h-12 ">
        <CSVLink data={csvData} filename={`${currentCode.split(' ')[currentCode.split(' ').length-1]}.csv`} className="flex justify-center items-center gap-2">
          {/* File name is now based on query */}
        <DownloadOutlined className="font-sans text-base font-bold text-white"/>
            <Typography className="font-sans text-base font-bold text-greenFont">
                Download CSV
            </Typography>
            
        </CSVLink>
      </Button> 
      </div>: <></>}
    </>
  );
}