import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
    const App = () => {
    const [action,setAction] = useState("Login");
    const [total,setTotal]=useState(12);
    const [completed, setCompleted] = useState(0);
    const [remaining, setRemaining] = useState(total);
    const [halls,setHalls]=useState(Array(12).fill(40));
    const [selected, setSelected] = useState([]);
    const [adminData, setAdminData] = useState([]);
    const [slotData, setSlotData] = useState([]);
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const [totalProfessors, setTotalProfessors] = useState(0);
    const [totalAssistantProfessors, setTotalAssistantProfessors] = useState(0);
    const [totalHallsAdmin, setTotalHallsAdmin] = useState(0);
    const [setDesignation] = useState("");

    const adjustDuties = () => {
      event.preventDefault();
      if (totalProfessors > 0 && totalAssistantProfessors > 0 && total > 0) {
        const profDuties = Math.floor((total * 2) / (totalProfessors + totalAssistantProfessors * 2));
        const apDuties = Math.floor((total * 2 * 2) / (totalProfessors + totalAssistantProfessors * 2));
        setTotal(profDuties + apDuties);
        setRemaining(total - completed);
      }
    };

    const handleRadioChange = (event) => {
      setDesignation(event.target.value);
      adjustDuties();
    };

    const handleClick = (event, newAction) => {
      event.preventDefault();
      if(action==="Login"){
        const staffID=document.getElementById("StaffID").value;
        if(staffID==="adminpsna123" && newAction==="Slot Registration"){
          setAction("Admin");
        }
        else if(newAction==="Staff Registration"){
          setAction("Staff Registration");
        }
        else{
          setAction("Slot Registration")
        }
      }else{
        setAction(newAction);
      }
  };

  const calculateTotalHalls = () => {
    const totals = [];
    adminData.forEach(row => {
        const existingEntry = totals.find(item => item.Date === row.Date && item.Slot === row.Slot);
        if (existingEntry) {
            existingEntry.Halls += parseInt(row.Halls);
        } else {
            totals.push({ Date: row.Date, Slot: row.Slot, Time: row.Time, Halls: parseInt(row.Halls) });
        }
    });
    console.log("Calculated totals (slotData):", totals);
    return totals;
};

const handleSave = (event) => {
  event.preventDefault();
  const totals = calculateTotalHalls();
  console.log("Aggregated slotData:", totals);
  setSlotData(totals); 
  const newHalls = totals.map(slot => slot.Halls);
  setHalls(newHalls);
  setShowSavedMessage(true);
  setTimeout(() => setShowSavedMessage(false), 2000);
};

const addRow = (event) => {
  event.preventDefault();
  const newRow = { Date: "", Slot: "", Time: "", Dept: "", Halls: "" };
  setAdminData(prevData => [...prevData, newRow]);
};

const Counter = (index) => {
  if (halls[index] > 0 && completed < total) {
      const updatedHalls = [...halls];
      updatedHalls[index] -= 1; 
      setHalls(updatedHalls);

      setCompleted(prev => prev + 1); 
      setRemaining(prev => prev - 1); 

      const selectedSlot = slotData[index];
      setSelected(prevSelected => [...prevSelected, selectedSlot]); 
  }
};
    return (
      <div className="bg-img">
    <div className='outer-box'>
    <h1>{action}</h1>
    <div className='box'>
    <form>
      <div className="inputs">
        {action==="Staff Registration"?
        <div>
          <div className="input-container">
  <i className="fas fa-user"></i>
  <input id="Name" className="InputIDs" type="text" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name"></input>
</div>
<div className="input-container">
  <span><i className="fas fa-building"></i></span>
  <input id="Dept" className="InputIDs" type="text" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Department"></input>
</div>
<label>Designation</label>
<div className="radio-group">
  <label>
    <input id="AP" type="radio" value="AP" name="desg" onChange={handleRadioChange} /> Assistant Professor
  </label>
  <label>
    <input id="P" type="radio" value="P" name="desg" onChange={handleRadioChange} /> Professor
  </label>
</div> 
<div className="input-container">
  <i className="fas fa-envelope"></i>
  <input id="mail" className="InputIDs" type="email" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email"></input>
</div>
<div className="input-container">
  <i className="fas fa-phone"></i>
  <input id="mobile" className="InputIDs" type="text" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mobile"></input>
</div>
<div className="input-container">
  <i className="fas fa-user"></i>
  <input id="StaffID" className="InputIDs" type="text" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Staff ID"></input>
</div>
<div className="input-container">
  <i className="fas fa-key"></i>
  <input id="Password" className="InputIDs" type="password" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password"></input>
</div>
          <button id="Register" onClick={(event) => handleClick(event, "Done")}>Register</button><br></br>
          <div>Go back to Login: <span onClick={(event) => handleClick(event, "Login")}>Login</span></div>
        </div>:
        <div></div>
        }  
        {action==="Done"?
        <div>
        <div id="done">Registration Complete!</div>
        <div>Go back to Login: <span onClick={(event) => handleClick(event, "Login")}>Login</span></div>
        </div>:
        <div></div>
        }
      {action==="Login"?
      <div>
        <div className="input-container">
  <i className="fas fa-user"></i>
  <input id="StaffID" className="InputIDs" type="text" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Staff ID"></input>
</div>
<div className="input-container">
  <i className="fas fa-key"></i>
  <input id="Password" className="InputIDs" type="password" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password"></input>
</div>
        <button id="Login" onClick={(event) => handleClick(event, "Slot Registration")}>Login</button><br></br>
        <div>Not Registered yet? <span onClick={(event) => handleClick(event, "Staff Registration")}>Register</span></div>
      </div>: 
      <div></div>
      }
      {action === "Admin" ?
      <div>
      <h2>Admin Dashboard</h2>
      <div className="input-container">
                    <label>Total Professors:</label>
                    <input
                      type="number"
                      value={totalProfessors}
                      onChange={(e) => setTotalProfessors(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="input-container">
                    <label>Total Assistant Professors:</label>
                    <input
                      type="number"
                      value={totalAssistantProfessors}
                      onChange={(e) =>
                        setTotalAssistantProfessors(parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="input-container">
                    <label>Total Halls:</label>
                    <input
                      type="number"
                      value={totalHallsAdmin}
                      onChange={(e) => setTotalHallsAdmin(parseInt(e.target.value))}
                    />
                  </div>

                  <button onClick={adjustDuties}>Adjust Duties</button>
      <table id="myTable" className="table table-success table-striped">
        <thead>
            <tr>
                <th>Date</th>
                <th>Slot</th>
                <th>Time</th>
                <th>Department</th>
                <th>No. of halls</th>
            </tr>
            </thead>
            <tbody>
            {
            adminData.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                  type="text"
                  value={row.Date}
                  onChange={(e) => {
                    const updatedRows = [...adminData];
                    updatedRows[index].Date = e.target.value;
                    setAdminData(updatedRows);
                  }}
                  />
                </td>
                <td>
                  <input
                  type="text"
                  value={row.Slot}
                  onChange={(e) => {
                    const updatedRows = [...adminData];
                    updatedRows[index].Slot = e.target.value;
                    setAdminData(updatedRows);
                  }}
                  />
                </td>
                <td>
                  <input
                  type="text"
                  value={row.Time}
                  onChange={(e) => {
                    const updatedRows = [...adminData];
                    updatedRows[index].Time = e.target.value;
                    setAdminData(updatedRows);
                  }}
                  />
                </td>
                <td>
                  <input
                  type="text"
                  value={row.Dept}
                  onChange={(e) => {
                    const updatedRows = [...adminData];
                    updatedRows[index].Dept = e.target.value;
                    setAdminData(updatedRows);
                  }}
                  />
                  </td>
                  <td>
                    <input
                    type="number"
                    value={row.Halls}
                    onChange={(e) => {
                      const updatedRows = [...adminData];
                      updatedRows[index].Halls = e.target.value;
                      setAdminData(updatedRows);
                    }}
                    />
                    </td>
                    </tr>
                  ))
                  }
                  </tbody>
    </table>
    <button onClick={(event) => handleClick(event, "Login")}>Back</button>
    <button id="moreBtn" onClick={addRow}>More</button>
    <button id="saveBtn" onClick={handleSave}>Save</button>
    <button id="view" onClick={(event) => handleClick(event, "Staff Duties")}>View</button>
    {showSavedMessage && (
  <div className="saved-message">
   --- Saved ---
  </div>
)}
                </div> : <div></div>}
                {action === "View All Slots" && (
                <div>
                  <h3>All Registered Slots</h3>
                  <table className="table table-success table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Slot</th>
                        <th>Time</th>
                        <th>Staff</th>
                        <th>Department</th>
                        <th>No. of halls</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slotData.map((slot, index) => (
                        <tr key={index}>
                          <td>{slot.Date}</td>
                          <td>{slot.Slot}</td>
                          <td>{slot.Time}</td>
                          <td>{slot.Staff}</td>
                          <td>{slot.Dept}</td>
                          <td>{slot.Halls}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={(event) => handleClick(event, "Admin")}>
                    Back
                  </button>
                </div>
              )}
              {
                action==="Staff Duties"?
                <div>
                  <table className="table table-success table-striped">
                    <thead>
                <tr>
                <th>Staff Name</th>
                <th>Staff ID</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Department</th>
                </tr>
                </thead>
                <tbody></tbody>
                </table>
                <button onClick={(event) => handleClick(event, "Admin")}>Back</button>
                </div>:<div></div>
              }
        {action==="Slot Registration"?
        <div>
          <ul>
            <li>Your duties Total: {total} </li>
            <li>Completed: {completed} </li>
            <li>Remaining: {remaining}</li>
          </ul>
          <div>
          {console.log("slotData rendering:", slotData)}
      {console.log("halls rendering:", halls)}
            <table className="table table-success table-striped">
              <thead>
                <tr>
                <th>Date</th>
                <th>Slot</th>
                <th>Time</th>
                <th>No. of halls available</th>
                <th>Selection</th>
                </tr>
                </thead>
                <tbody>
              {slotData.length === 0 ? (
                <tr>
                  <td colSpan="5">Not scheduled Yet.</td>
                  </tr>
                  ) : (
                    slotData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.Date}</td>
                      <td>{row.Slot}</td>
                      <td>{row.Time}</td>
                      <td>{halls[index]}</td>
                      <td>
                        {selected.includes(row) ? (
                          <span>Selected</span>
                        ) : (
                        <button onClick={() => Counter(index)} disabled={halls[index] === 0 || selected.includes(row)}>Select</button>
                         )}
                   </td>
                 </tr>
                   ))
                   )}
              </tbody>
              </table>
              <button onClick={(event) => handleClick(event, "Login")}>Back</button>
              <button onClick={(event) => handleClick(event, "Hall Allotment")}>View</button>
        </div></div>:
        <div></div>
        }
        {action === "Hall Allotment" &&
                                <div>
                                    <table className="table table-success table-striped">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Slot</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selected.map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row.Date}</td>
                                                    <td>{row.Slot}</td>
                                                    <td>{row.Time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button onClick={(event) => handleClick(event, "Slot Registration")}>Back</button>
                                </div>
                                
                            }
        </div>
    </form>
    </div>
    </div>
    </div>
  );
};
export default App;
