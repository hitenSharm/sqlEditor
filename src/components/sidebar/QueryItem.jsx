import {  PlayCircleFilled } from "@ant-design/icons"
import { Button, Row, Tooltip, Typography } from "antd"
import { useAppContext } from "../../context/AppContext";
import CustomToolTip from "../common/CustomToolTip";

export const QueryItem = ({ queryCode, queryDesc }) => {    
    const {executeQuery}=useAppContext();    

    return (
        <>
            <Row className="mt-2">
                <div className=" flex text-center items-center justify-around w-full">
                    <div className=" p-2 w-[180px]">
                        <Typography className=" font-medium">{queryCode}</Typography>
                        <CustomToolTip title={queryDesc} condition={queryDesc.length>20} placement="bottom">
                        <Typography className=" border-blue-500 border rounded-xl p-1 mt-2 ellipsis-container">{queryDesc}</Typography>
                        </CustomToolTip>
                    </div>
                    <Button className=" items-center flex justify-center w-fit border-0" onClick={()=>executeQuery(queryCode)}>
                        <PlayCircleFilled style={{ fontSize: '20px', color: '#08c' }} />
                    </Button>
                </div>
            </Row></>
    );
}