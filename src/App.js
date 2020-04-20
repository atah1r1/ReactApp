import React, { useState } from "react";
import Form from './pages/form';
import TableData from './pages/table'
import EditForm from "./pages/editform";



const App = () => {
  const [view, setView] = useState("table");
  const [editClicked, setEditClicked] = useState(false);
  const [idForEdit, setIdForEdit] = useState('');
  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>App To Create New Notification</h1>
          {view === 'table' && <TableData Clicked={setEditClicked} goTo={setView} id={setIdForEdit}/>}
          {view === 'form' && <Form 
                                  editClicked={editClicked} 
                                  setEditClicked={setEditClicked} 
                                  goTo={setView}
                                  idf = {idForEdit}
                                  />}
          {view === 'editform' && <EditForm idf={idForEdit} goTo={setView}/>}
      </div>
    </>
  );
};

export default App;
