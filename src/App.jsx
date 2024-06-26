import { useState } from "react";
import Header from "./components/Header";
import CohortList from "./components/CohortList";
import StudentList from "./components/StudentList";
import data from "./data/data.json"
import "./App.css"

function App() {

  const [dataState, setDataState] = useState(data);

  const [studentArray, setStudentArray] = useState(dataState);

  const [cohort, setCohort] = useState("All Students");

  function handleCohortChange(e) {
    setStudentArray(e.target.value === "All Students" ? [...dataState] : dataState.filter(student => student.cohort.cohortCode === e.target.value.split(" ").join("")));
    setCohort(e.target.value);
  }
  
  let cohortList = [];

  for (let student of data) {
    if(!cohortList.includes(student.cohort.cohortCode)) {
      cohortList.push(student.cohort.cohortCode);
    }
  }

  let seasonObject = {
    Winter: 0, 
    Fall: 1, 
    Summer: 2, 
    Spring: 3
  };
  
  let sortedCohortList = cohortList.map(ele => `${ele.slice(0,-4)} ${ele.slice(-4)}`).sort((a, b) => b.split(" ")[1] - a.split(" ")[1] || seasonObject[a.split(" ")[0]] - seasonObject[b.split(" ")[0]]);
  
  let cohortSelection = ["All Students"].concat(sortedCohortList);

  return (
    <div className="App">
      <Header />
      <main>
      <CohortList cohortSelection={cohortSelection} handleCohortChange={handleCohortChange}/>
      <StudentList cohort={cohort} studentArray={studentArray} setDataState={setDataState} dataState={dataState} />  
      </main>
    </div>
  );
}

export default App;
