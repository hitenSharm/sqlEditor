import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Button } from "antd";

export const SQLEditor = () => {
    const { currentCode,executeQuery } = useAppContext();
    const [sqlCode, setSqlCode] = useState(currentCode);
    //not really used but if we want a custom query

    return <>
        <div className=" w-full p-4">
            <CodeMirror value={currentCode} width="100%" height="500px" theme={vscodeDark} onChange={(e) => setSqlCode(e)} />
        </div>
        <Button className=" mb-4 mr-4" onClick={()=>executeQuery(sqlCode)}>Run Code</Button>
    </>
};