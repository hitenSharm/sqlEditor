import { EditFilled, PlayCircleFilled, PlayCircleOutlined } from "@ant-design/icons"
import { Button, Col, Input, Row, Tooltip, Typography } from "antd"
import { useAppContext } from "../../context/AppContext";

export const QueryItem = ({ queryCode, queryDesc }) => {    
    const {executeQuery}=useAppContext();
    // Function to truncate text to the first 15 words for description as it can be longer
    const truncateText = (text) => {
        if (text.length > 20) {
            return text.slice(0, 20) + '...';
        }
        return text;
    };

    return (
        <>
            <Row className="mt-2">
                <div className=" flex text-center items-center justify-around w-full">
                    <div className=" p-2 w-[180px]">
                        <Typography className=" font-medium">{queryCode}</Typography>
                        <Tooltip title={queryDesc} placement="bottom">
                            <Typography className=" border-blue-500 border rounded-xl p-1 mt-2">{truncateText(queryDesc)}</Typography>
                        </Tooltip>
                    </div>
                    <Button className=" items-center flex justify-center w-fit border-0" onClick={()=>executeQuery(queryCode)}>
                        <PlayCircleFilled style={{ fontSize: '20px', color: '#08c' }} />
                    </Button>
                </div>
            </Row></>
    );
}