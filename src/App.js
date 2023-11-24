import { useState } from "react";
import { SQLEditor } from "./components/editor/SqlEditor";
import { SideBar } from "./components/sidebar/SideBar";
import { ResultsTable } from "./components/resultTable/Results";

function App() {  
  
  return (
    <>
      <div className=" flex">
        <SideBar/>
        <div className="w-[100%]">
          <SQLEditor/>
          <ResultsTable/>
        </div>
      </div>
    </>
  );
}

export default App;
