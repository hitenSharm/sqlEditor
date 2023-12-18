import CodeMirror from "@uiw/react-codemirror";
import {  useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Button, Typography } from "antd";
import { sql } from "@codemirror/lang-sql";
import { PlayCircleFilled, PlayCircleTwoTone } from "@ant-design/icons";

export const SQLEditor = () => {
    const { currentCode, executeQuery } = useAppContext();
    const [sqlCode, setSqlCode] = useState(currentCode);
    //not really used but if we want a custom query

    return <>
        <div className=" w-full flex justify-center items-center mt-2">
            <Typography className=" text-2xl font-bold text-white font-sans">SQL Editor</Typography>
        </div>
        <div className=" w-full p-4">
            <CodeMirror value={currentCode} width="100%" height="500px" theme="dark"
                extensions={[sql()]} onChange={(e) => setSqlCode(e)} />
        </div>
        <div className=" w-full flex justify-end pr-4">

            <Button className=" ml-4 flex justify-center items-center gap-2 bg-greyDark rounded-xl border-0 w-[180px] h-12" onClick={() => executeQuery(sqlCode)}>
                <PlayCircleFilled className="font-sans text-base font-bold text-white" />
                <Typography className="font-sans text-base font-bold text-greenFont">
                    Run Code
                </Typography>
            </Button>
        </div>
    </>
};