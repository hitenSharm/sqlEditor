import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

export const SQLEditor = () => {
    const { currentCode } = useAppContext();
    const [sqlCode, setSqlCode] = useState(currentCode)

    return <>
        <div className=" w-full p-4">
            <CodeMirror value={currentCode} width="100%" height="500px" theme={vscodeDark} onChange={(e) => setSqlCode(e)} />
        </div>
    </>
};