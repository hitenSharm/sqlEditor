import { SQLEditor } from "./components/editor/SqlEditor";
import { ResultsTable } from "./components/resultTable/Results";
import SideBar from "./components/sidebar/SideBar";


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
