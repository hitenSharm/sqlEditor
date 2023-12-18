import {  PlayCircleFilled } from "@ant-design/icons"
import { Button, Row, Tooltip, Typography } from "antd"
import { useAppContext } from "../../context/AppContext";
import CustomToolTip from "../common/CustomToolTip";

export const QueryItem = ({ queryCode, queryDesc }) => {    
    const {executeQuery}=useAppContext();    

    return (
        <>
            <Row className="mt-4 bg-greyDark rounded-2xl p-2">
                <div className=" flex text-center items-center justify-around w-full">
                    <div className=" p-2 w-[200px]">
                        <div className=" w-full">
                        <Typography className=" font-medium text-greenFont font-mono text-md">{queryCode}</Typography>
                        </div>
                        <CustomToolTip title={queryDesc} condition={queryDesc.length>20} placement="bottom">
                        <Typography className=" bg-greyLight border-greenFont text-white rounded-xl font-semibold font-sans p-3 mt-2 ellipsis-container">{queryDesc}</Typography>
                        </CustomToolTip>
                    </div>
                    <Button className=" items-center p-1 flex justify-center w-fit border-0" onClick={()=>executeQuery(queryCode)}>
                        <PlayCircleFilled style={{ fontSize: '25px', color: 'white' }} />
                    </Button>
                </div>
            </Row></>
    );
}